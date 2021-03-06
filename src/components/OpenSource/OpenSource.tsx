import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ExternalLink from 'components/ExternalLink';
import Heading from 'components/Heading';
import InternalLink from 'components/InternalLink';
import { bySlug as ossBySlug } from 'oss';
import React from 'react';
import { bySlug as transformsBySlug } from 'transforms';

export interface OpenSourceProps {
  readonly ossPath: string;
}

const OpenSource: React.FC<OpenSourceProps> = ({ ossPath }) => (
  <>
    <Box mb={2}>
      <Heading level={2}>Open Source Projects</Heading>
      <Typography variant="subtitle1">
        The following open source projects have been used to create the text transforms for TextPipeline.
      </Typography>
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Transforms</TableCell>
            <TableCell>License</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(ossBySlug).map(slug => {
            const openSourceProject = ossBySlug[slug];
            const transformCount = Object.keys(transformsBySlug).filter(transformSlug => {
              const transform = transformsBySlug[transformSlug];
              if (transform.openSourceProject) {
                return transform.openSourceProject.slug === slug;
              }
              return false;
            }).length;
            return (
              <TableRow key={slug}>
                <TableCell>
                  <InternalLink href={`${ossPath}/${slug}`}>{openSourceProject.name}</InternalLink>
                </TableCell>
                <TableCell>{transformCount}</TableCell>
                <TableCell>
                  <ExternalLink href={openSourceProject.license.href}>{openSourceProject.license.name}</ExternalLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default OpenSource;
