export const apollo_thunk = (call, callback) => (dispatch, getState, { apollo }) => {
  const { mutation, query, variables } = call;
  if (mutation) {
    console.log({ mutation, variables });
    return apollo.mutate({ mutation, variables }).then(
      result => callback({ ...result, type: "SUCCESS" }),
      error => callback({ ...error, type: "FAILURE" }),
    );
  }
  return apollo.query({ query, variables }).then(
    result => callback({ ...result, type: "SUCCESS" }),
    error => callback({ ...error, type: "FAILURE" }),
  )
}

export const mutate = (mutation, variables, callback) =>  (
  apollo_thunk({ mutation, variables }, callback)
);
