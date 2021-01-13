#!/usr/bin/env node
const { execSync } = require( "child_process" );
exports.preCommit = ( props ) =>
{
  const { CI_REPOSITORY_OWNER_SLUG, CI_REPOSITORY_NAME_SLUG } = process.env
  const tag = props.tag
  imageName = `ghcr.io/${ CI_REPOSITORY_OWNER_SLUG }/${ CI_REPOSITORY_NAME_SLUG }:${ tag }`
  ciFileName = 'auto-deploy.gitlab-ci.yml'
  command = `yq eval -i '.".auto-deploy".image = "${ imageName }" ' ${ ciFileName }`
  execSync( command )

}
