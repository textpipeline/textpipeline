import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import Heading from 'components/Heading';
import ListItemLink from 'components/ListItemLink';
import TransformList from 'components/TransformList';
import React from 'react';
import { byOpenSourceProjectSlug } from 'transforms';
import { OpenSourceProject as OSSProject } from 'oss';

export type OpenSourceProjectProps = OSSProject & {
  readonly transformsPath: string;
};

const OpenSourceProject: React.FC<OpenSourceProjectProps> = ({
  name,
  slug,
  description,
  href,
  repositoryHref,
  license,
  licenseText,
  transformsPath,
}) => {
  const transforms = byOpenSourceProjectSlug[slug] || [];
  return (
    <>
      <Box mb={2}>
        <Heading level={2}>{name}</Heading>
        <Typography variant="subtitle1">{description}</Typography>
      </Box>
      <Box display="flex">
        <Paper>
          <Box px={2}>
            <Box pb={3}>
              <List>
                <ListItemLink icon={LinkIcon} text="Project" subtitle={href} href={href} isExternal />
                <Divider />
                <ListItemLink
                  icon={LinkIcon}
                  text="Repository"
                  subtitle={repositoryHref}
                  href={repositoryHref}
                  isExternal
                />
                <Divider />
                <ListItemLink icon={LinkIcon} text="License" subtitle={license.name} href={license.href} isExternal />
                <Divider />
              </List>
            </Box>
            <Heading level={4}>Transforms using this project:</Heading>
            <TransformList transforms={transforms} transformsPath={transformsPath} />
          </Box>
        </Paper>
        <Box px={2}>
          <pre>{licenseText}</pre>
        </Box>
      </Box>
    </>
  );
};

export default OpenSourceProject;
