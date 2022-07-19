export type Service =
  | 'Github'
  | 'Launch Darkly'
  | 'Auth0'
  | 'Postman'
  | 'Figma'
  | 'Lucid.app'
  | 'Confluence'
  | 'Jira'
  | 'Apple App Store Connect'
  | 'CircleCI'
  | 'Unbank'
  | 'Mixpanel'
  | 'Firebase'
  | 'Slack'
  | 'Zoom'
  | 'Cognito'
  | 'Papaya'
  | 'Zendesk'
  | 'Pinwheel'
  | 'Lithic';

export type ServiceType = {
  name: Service;
  function: string;
  adminEmail?: string;
  url: string;
  imageUrl: string;
  imageStyles?: string;
};
