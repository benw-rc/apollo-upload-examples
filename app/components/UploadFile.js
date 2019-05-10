import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const S3_DOCUMENT_STORE_BUCKET = 'bucket' // replace bucket here
const S3_DOCUMENT_STORE_KEY = 'orders'

let s3Location = {}
s3Location = {
  bucket: S3_DOCUMENT_STORE_BUCKET,
  key: S3_DOCUMENT_STORE_KEY
}

const UPLOAD_FILE = gql`
  mutation singleUpload($input: DocumentInput!) {
    singleUpload(input: $input) {
      id
      fileName
      uploadedBy
      uploadedAt
    }
  }
`

const uploadOneFile = ({ mutate }) => {
  const handleChange = ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    const input = {
      config: {
        PROJECT_NAME: 'testing project',
        PANEL_NAME: 'my panel',
        PANEL_TYPE: 'panel type',
        EMAILS: 'scientist@rc.com'
      },
      file,
      s3Location
    }

    return (
      validity.valid &&
      mutate({
        variables: { input }
      })
    )
  }

  return <input type="file" required onChange={handleChange} />
}

const enhancedUploadOneFile = graphql(UPLOAD_FILE)
const uploadFile = enhancedUploadOneFile(uploadOneFile)

export default uploadFile
