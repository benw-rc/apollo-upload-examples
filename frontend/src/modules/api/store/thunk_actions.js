import gql from 'graphql-tag';
import { mutate } from 'rc-modules/graphql/store/thunk_actions';
export const upload_file = (file) => {
  return mutate(
    gql`mutation($file: Upload!) {
      singleUpload(file: $file) {
        id
      }
    }`,
    { file },
    console.log
  )
}
