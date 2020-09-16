// libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createConsumer } from '@rails/actioncable';

// ActionCableHooks
import { ActionCableContext } from './context.jsx';

const propTypes = {
  url: PropTypes.string,
  children: PropTypes.any
};

const defaultProps = {
  url: null,
  children: null
};

export const ActionCableProvider = ({ url, children }) => {
  const [conn, setConn] = useState(null);
  console.log("provider called");
  useEffect(() => {
    console.log("url: " + url);
    if (!conn) setConn(createConsumer(url));

    return () => conn && conn.disconnect();
  }, [url]);

  return <ActionCableContext.Provider value={{ conn }}>{children}</ActionCableContext.Provider>;
};

ActionCableProvider.propTypes = propTypes;
ActionCableProvider.defaultProps = defaultProps;
