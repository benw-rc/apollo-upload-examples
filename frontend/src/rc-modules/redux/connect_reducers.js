/** @module */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as _ from 'lodash';

export const is_debug = false;

/**
 * Log the given text, only if is_debug is set to true.
 * The output for these logs is dense, and generally we
 * will want to be able to toggle it all on or off for
 * dev/debug work when necessary.
 *
 * @function
 * @param {string} text - text to log to console.
 */
export const log = (text) => is_debug && console.log(text);

/**
 * Takes an arbitrary number of strings and returns those
 * strings joined by the '.' character for namespace pathing.
 *
 * Example Usage:
 *   join('a', 'long', 'namespace', 'path'); // 'a.long.namespace.path'
 *
 * @function
 * @param {...string} args - N strings to be joined.
 * @return {string} - joined string
 */
export const join = (...args) => _.join(args.filter(val => val !== ''), '.');

/**
 * Take an object of the form
 *   ```{ <key> : { module }, ... }```
 * and return a namespaced reducer bundle based off of the contents of
 * the modules in that object.
 *
 * output: 
 *   ```{ <key> : { module.namespacedTo(key) }, ... }```
 *
 * Calls itself recursively if the value to a key is another dictionary.
 *
 * Actions:
 *  - types will be prefaced with the given namespace and a '.' separator
 *
 * Reducers:
 *  - actions will be handled by the reducer, with a modified type:
 *   - types prefaced with the given namespace will have it stripped.
 *   - types not prefaced with the namespace will get 'Global.' prefaced.
 *
 * Selectors:
 *  - will receive a subset of the global state dictated by the namespace
 *
 * Thunk Actions:
 *  - will simply be placed in the larger structure appropriately
 *
 * Types:
 *  - will simply be placed in the larger structure appropriately
 *
 * For the sake of cleanliness and testing, this module must be instantiated, and then
 * have its load() method called to populate it, and then the connected store is available
 * via a store() accessor.
 *
 * Example usage: 
 *  ```
 *  const connected_store = new ConnectedStore(mapping);
 *  connected_store.load();
 *  const store = connected_store.store();
 *  ```
 *
 * store() accessor returns an object of the same shape as the input mapping,
 * where each module is namespaced according to its position in the mapping.
 */
export class ConnectedStore {
  /**
   * Create a connected store
   * @param {Object} mapping - a nested object of redux modules to be namespaced.
   */
  constructor(mapping) {
    this.mapping = mapping;
    this.actions = {};
    this.action_types = {};
    this.types = {};
    this.thunk_actions = {};
    this.selectors = {};
    this.reducer_mapping = {};
  }

  /**
   * Accessor method to output final store configuration.
   *
   * @method
   * @return {Object} - connected redux store for final usage.
   */
  store = () => ({
    actions: this.actions,
    action_types: this.action_types,
    reducer: this.reducer,
    selectors: this.selectors,
    thunk_actions: this.thunk_actions,
  });

  /**
   * combine stores in the mapping into a single store.
   *
   * @method
   */
  load = () => {
    _.forIn(this.mapping, (module, ns) => {
      const _module = new Module(this, '', module, ns);
      _module.load();
    });
    log({ reducer_mapping: this.reducer_mapping });
    this.reducer = this._deep_combine_reducers(this.reducer_mapping);
    this.global_action_types = this._make_global_types(this.action_types);
  }

  /**
   * @callback reducer
   * @param {Object} state - current redux store state.
   * @param {Object} action - action being handled.
   */

  /**
   * Return a namespaced version of a reducer function.
   *
   * This upates the type of incoming actions, based on the namespace.
   * If the type starts witht he namespace, it is stripped, otherwise, the
   * string "Global" is prepended with a '.' in case the reducer really needs
   * to listen to a global action.
   *
   * Preferably, the global actions will not be used.
   *
   * @method
   * @private
   * @param {reducer} reducer - un-namespaced reducer function.
   * @param {string} namespace - reducer namespace.
   * @return {reducer} - namespaced reducer.
   */
  _namespace_reducer = (reducer, namespace) => (
    (state=undefined, action) => {
      const mod = namespace + '.';
      let { type } = action;
      type = ( type.startsWith(mod) 
        ? type.slice(mod.length) 
        : 'Global.' + type
      );
      return reducer(state, { ...action, type });
    }
  );

  /**
   * Takes a reducer mapping and returns the output of combineReducers on
   * a mapping of those reducers, in the same mapping, but namespaced to their
   * location/path within the mapping.
   *
   * @method
   * @private
   * @param {Object} mapping - reducer mapping object
   * @param {string} namespace - current namespace.
   * @return {reducer} - combined namespaced reducer function
   */
  _deep_combine_reducers = (mapping, namespace) => {
    const out_mapping = _.mapValues(mapping, (reducer, path) => {
      const ns = namespace ? `${namespace}.${path}` : path;
      const is_fn = typeof(reducer) === 'function';
      const operation = is_fn ? this._namespace_reducer : this._deep_combine_reducers;
      log({ path, reducer, namespace, ns, is_fn });
      return operation(reducer, ns);
    });
    log({ combined_reducer_mapping: out_mapping, namespace });
    return combineReducers(out_mapping);
  }

  /**
   * Recursively make a dictionary of global action types in case any reducers need them.
   *
   * @method
   * @private
   * @param {Object} action_types - dict of object types
   * @return {Object} - dict of global action types.
   */
  _make_global_types = (action_types) => {
    return _.mapValues(action_types, (type, key) => {
      if (typeof type === 'string') {
        return 'Global.' + type;
      }
      return this._make_global_types(type);
    });
  }
};

/**
 * Main workhorse of the namespacing operation.
 *
 * Performs the direct checking and conversion for an individual module, and then
 * recursively checks for children modules.
 */
export class Module {
  /**
   * Create a module
   *
   * @param {ConnectedStore} store - ConnectedStore instance
   * @param {string} path -  post-namespace path
   * @param module { Module } - module to be converted/namespaced
   * @param ns { string } - namespace string (global location of module)
   */
  constructor(store, path, module, ns) {
    this.store = store;
    this.module = module;
    this.namespace = path ? join(path, ns) : ns;
  }

  /**
   * Loads and namespaces relevant parts of the module, ending by recursively
   * looking for more modules.
   *
   * @method
   */
  load = () => {
    this._load_actions();
    this._load_reducer();
    this._load_selectors('', this.namespace);
    this._load_thunk_actions();
    this._load_types();
    this._load_modules();
  }

  /**
   * Simple accessor for appending strings to the namespace.
   *
   * Example usage:
   *  _mk_path('some', 'path') // 'My.Current.Namespace.some.path'
   *
   * @method
   * @private
   * @param {string[]} args - list of strings to append.
   * @return {string} namespaced path string.
   */
  _mk_path = (...args) => join(this.namespace, ...args);

  /**
   * load all actions and types into the store module.
   * @method
   * @private
   */
  _load_actions = () => {
    const { actions={} } = this.module;
    _.forIn(actions, (action, action_type) => {
      const path = this._mk_path(action_type);
      const type = this._mk_path(action.type);
      const _action = (...props) => ({ ...action.fn(...props), type });
      _.set(this.store.action_types, path, type);
      _.set(this.store.actions, path, _action);
    });
  }

  /**
   * Build reducer mapping for later connection.
   *
   * @method
   * @private
   */
  _load_reducer = () => {
    if (this.module.reducer !== undefined) {
      _.set(this.store.reducer_mapping, this.namespace, this.module.reducer);
    }
  }

  /**
   * Copy the thunk_actions directly into the outgoing store.
   *
   * @method
   * @private
   */
  _load_thunk_actions = () => {
    const { thunk_actions={} } = this.module;
    _.forIn(thunk_actions, (thunk_action, key) => {
      _.set(this.store.thunk_actions, this._mk_path(key), thunk_action);
    });
  }

  /**
   * Copy the thunk_actions directly into the outgoing store.
   *
   * @method
   * @private
   */
  _load_types = () => {
    const { types={} } = this.module;
    _.forIn(types, (key, type) => {
      _.set(this.store.types, this._mk_path(key), type);
    });
  }

  /**
   * Loads new modules recursively from the 'modules' key of passed module.
   *
   * @method
   * @private
   */
  _load_modules = () => {
    const { modules={} } = this.module;
    _.forIn(modules, (module, ns) => {
      const _module = new Module(this.store, this.namespace, module, ns);
      _module.load();
    });
  }

  /**
   * Load the selectors from a module.
   * 
   * Grabs the selectors from the module's selectors by path.
   *
   * For each item in the associated object:
   *  - if the item is a selector, calls ns_selector to namespace it
   *  - else calls load_selectors recursively with an updated selector path
   *
   * @method
   * @private
   * @param {string} path - path to the selectors after the current namespace path.
   */
  _load_selectors = (path) => {
    log("load selectors");
    log({ selectors: this.module.selectors, path, ns_path: this.namespace });

    const selectors = (
      path === ''
        ? this.module.selectors
        : _.get(this.module.selectors, path, {})
    );
    _.forIn(selectors, (selector, sel_path) => {
      const is_fn = typeof selector === 'function';
      log({ selector, is_fn, path, ns_path: this.namespace, sel_path });
      if (is_fn) {
        this._ns_selector(selector, sel_path, path);
      }
      else {
        const out_path = join(path, sel_path);
        log(out_path, this._mk_path(path));
        this._load_selectors(out_path);
      }
    });

    this._load_meta_selectors(path);
  }

  /**
   * @callback selector
   * @param {Object} state - current redux store state
   * @param {...args} - additional selector args
   */

  /**
   * Creates a namespaced selector based on a given
   * selector, object path, and selector path.
   *
   * Example usage:
   * ```
   *   // module.Module.selectors = { a_value: (state) => ..., }
   *   const out = ns_selector(meta_sel, 'a_value', 'module.Module')
   *```
   *
   * @method
   * @private
   * @param {selector} selector - selector definition to namespace
   * @param {string} sel_path -  selector path/name
   * @param {string} path - path to the parent selectors group.
   */
  _ns_selector = (selector, sel_path, path) => {
    log("ns selector");
    const ns_path = this._mk_path(path);
    log({ selector, sel_path, path });
    const new_selector = (state, ...args) => selector(_.get(state, ns_path), ...args);
    const ns_sel_path = join(ns_path, sel_path);
    _.set(this.store.selectors, ns_sel_path, new_selector);
    log({ ns_sel_path: path, new_selector, selectors: this.store.selectors });
  }

  /**
   * Loads meta-selectors from a module.
   * 
   * These are an object structure designed to accomodate reselect's
   * memoized selectors.
   *
   * Expects to find objects, each with a list of selectors, and a function to be called
   * with the sequential output of those selectors.
   *
   * Returns a reselect memoized selector namespaced into the store.
   *
   * @method
   * @private
   * @param {string} path - path to the meta-selectors object.
   */
  _load_meta_selectors = (path) => {
    const selectors = (
      path === ''
        ? this.module.meta_selectors
        : _.get(this.module.meta_selectors, path, {})
    );
    _.forIn(selectors, (selector, sel_path) => {
      const is_fn = typeof selector.fn === 'function';
      if (is_fn) {
        this._ns_meta_selector(selector, sel_path, path);
      }
      else {
        this._load_meta_selectors(join(path, sel_path));
      }
    });
  }

  /**
   * Creates a namespaced memoized reselector based on a given
   * selector, object path, and selector path.
   *
   * Example usage:
   *   ```
   *   // module.Module.meta_selectors = { a_value: {...} }
   *   const out = ns_meta_selector(meta_sel, 'a_value', 'module.Module')
   *   ```
   *
   * @method
   * @private
   * @param {selector} selector - meta-selector definition to interpret
   * @param {string} sel_path -  selector path/name
   * @param {string} path - path to the parent meta-selectors group.
   */
  _ns_meta_selector = (selector, sel_path, path) => {
    let { selectors, fn } = selector;
    const ns_path = this._mk_path(path);
    selectors = selectors.map(sel => (state, ...args) => sel(_.get(state, ns_path), ...args));
    _.set(
      this.store.selectors,
      this._mk_path(path, sel_path),
      createSelector(selectors, fn)
    )
  }
}

/**
 * Takes a redux store mapping and returns the store output from a
 * ConnectedReducer instance based on that mapping.
 *
 * @function
 * @param {Object} mapping - redux store mapping
 * @return {Object} -
 *   usable connected namespaced redux store object.
 *   ```
 *   {
 *     actions,
 *     action_types,
 *     reducer,
 *     selectors,
 *     thunk_actions,
 *   }
 *   ```
 */
export const connect_reducers = (mapping) => {
  const store = new ConnectedStore(mapping);
  store.load();
  return store.store();
}

export default connect_reducers;
