import React from "react";
import ContributionGraph from "../ContributionGraph";
type ContributionGraphProps = {
  username: string;
};

const ContributionGraphPlaceholder: React.FC<ContributionGraphProps> = ({
  username,
}) => {
  return <ContributionGraph username={username} />;
};
export default ContributionGraphPlaceholder;
