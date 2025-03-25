export const privacyPolicies = [
  {
    title: "Use of GitHub OAuth Credentials",
    content:
      "We use your GitHub OAuth credentials solely to access the necessary data required to generate your GitHub profile card. This includes your public GitHub details such as your username, profile picture, and public repositories. We do not use your credentials for any other purpose.",
  },
  {
    title: "Data Fetching via GitHub APIs",
    content:
      "All profile details are fetched exclusively through the official GitHub REST and GraphQL APIs. This ensures that your data is accessed securely and only as permitted by GitHub’s API policies. No data is collected or processed outside of these APIs.",
  },
  {
    title: "No Data Storage",
    content:
      "We do not store any of your GitHub OAuth credentials or profile data on our servers. The information retrieved from your GitHub account is used temporarily to generate your profile card and is not saved or stored after the card is generated.",
  },
  {
    title: "Third-Party Services",
    content:
      "We do not share your GitHub credentials or any other personal data with third-party services. The GitHub OAuth integration is used solely to fetch data for the profile card generator, and no additional sharing or processing occurs beyond that.",
  },
  {
    title: "User Control",
    content:
      "You are in full control of your data. At any time, you can revoke our application's access to your GitHub account by going to your GitHub account settings under the 'Authorized OAuth Apps' section.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically to stay informed about how we protect your information.",
  },
];

export const xContent = encodeURIComponent(
  `🚀 I just generated my GitHub profile card using codeprofile 🔥🔥!
   \n\n[Insert your card png]
   \n\n#GitHub #ProfileCardGenerator #codeprofile`
);

export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
