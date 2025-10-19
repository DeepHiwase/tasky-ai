/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Head component for the app
 */

// Node Modules
import { Helmet } from "react-helmet";

type HeadProps = {
  title: string;
};

const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Head;
