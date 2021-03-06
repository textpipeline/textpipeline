import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RepeatIcon from '@material-ui/icons/Repeat';
import copy from 'clipboard-copy';
import Heading from 'components/Heading';
import InternalLink from 'components/InternalLink';
import React, { ChangeEvent, useState } from 'react';
import { Transform as TextTransform } from 'transforms/types';

const textFieldRowCount = 12;

export interface TransformProps {
  readonly name: TextTransform['name'];
  readonly inputTypeName: TextTransform['inputTypeName'];
  readonly outputTypeName: TextTransform['outputTypeName'];
  readonly defaultOutput: TextTransform['defaultOutput'];
  readonly execute: TextTransform['execute'];
  readonly ossHref: string | undefined;
}

const Transform: React.FC<TransformProps> = ({
  name,
  inputTypeName,
  outputTypeName,
  execute,
  defaultOutput,
  ossHref,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [error, setError] = useState<String | string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = !error;
  const inputHelperText = isValid ? "Once you've finished click the button to transform" : error;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
  };

  const onTransformClick = async () => {
    setCopied(false);
    setOutputValue('');
    setError(null);
    if (inputValue.trim() === '') {
      return;
    }
    setLoading(true);
    try {
      const output = await execute(inputValue);
      setOutputValue(output);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string' || err instanceof String) {
        setError(err);
      } else {
        setError('Unable to transform text.');
      }
      setOutputValue(defaultOutput);
    } finally {
      setLoading(false);
    }
  };

  const onClearClick = () => {
    setInputValue('');
    setOutputValue('');
    setError(null);
    setCopied(false);
  };

  const onCopyToClipboardClick = () => {
    copy(outputValue);
    setCopied(true);
  };

  return (
    <>
      <Box display="flex" flexWrap="nowrap" justifyContent="space-between" alignItems="center">
        <Heading level={2}>{name}</Heading>
        {ossHref && <InternalLink href={ossHref}>about this transform</InternalLink>}
      </Box>

      <Box my={3}>
        <form noValidate autoComplete="off">
          <TextField
            id="text-to-transform"
            label="Text to transform"
            placeholder={`Enter ${inputTypeName} here`}
            helperText={inputHelperText}
            error={!isValid}
            variant="outlined"
            rows={textFieldRowCount}
            value={inputValue}
            onChange={onChange}
            color="primary"
            autoFocus
            fullWidth
            multiline
            required
            disabled={loading}
          />
          <Box display="flex" justifyContent="flex-end" my={3}>
            {loading && <CircularProgress />}
            <Box mx={1}>
              <Button
                onClick={onTransformClick}
                variant="contained"
                color="primary"
                size="large"
                disabled={!inputValue || loading}
                endIcon={<RepeatIcon />}
                disableElevation
              >
                Transform
              </Button>
            </Box>
            <Button
              onClick={onClearClick}
              variant="outlined"
              disableElevation
              size="large"
              disabled={!inputValue || loading}
            >
              Clear
            </Button>
          </Box>
          <TextField
            id="transformed-text"
            label="Transformed text"
            placeholder={`${outputTypeName} will appear here`}
            variant="outlined"
            rows={textFieldRowCount}
            value={outputValue}
            color="primary"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            multiline
            disabled={loading}
          />
          <Box display="flex" justifyContent="flex-end" my={3}>
            {copied && (
              <Box mx={1} color="success.main">
                <Typography>Copied!</Typography>
              </Box>
            )}
            <Button
              onClick={onCopyToClipboardClick}
              variant="contained"
              color="primary"
              size="small"
              disabled={!outputValue}
              endIcon={<AssignmentIcon />}
              disableElevation
            >
              Copy
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Transform;
