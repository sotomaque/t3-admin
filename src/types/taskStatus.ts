export type TaskStatusType =
  | 'Initial'
  | 'Sending Verification Email'
  | 'Verification Email Sent'
  | 'Verifying OTP'
  | 'OTP Verified'
  | 'OTP Verification Failed'
  | 'Registering User' // with eco server
  | 'Creating PT Account'
  | 'Submitting PT Documents'
  | 'Getting CIP'
  | 'Verifying CIP'
  | 'Verifying KYC'
  | 'Completed'
  | 'Error';
