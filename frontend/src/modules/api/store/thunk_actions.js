import gql from 'graphql-tag';

import { mutate } from 'rc-modules/graphql/store/thunk_actions';
import { S3Location } from '../variables';

export const upload_file = (file) => {
  const input = {
    config: {
      PROJECT_NAME: 'testing project',
      PANEL_NAME: 'my panel',
      PANEL_TYPE: 'panel type',
      EMAILS: 'scientist@rc.com',
    },
    file,
    s3Location: S3Location
  };
    
  return mutate(
    gql`mutation($input: DocumentInput!) {
      singleUpload(input: $input) {
        id
      }
    }`,
    { input },
    () => ({})
  )
}
