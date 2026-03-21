export const sendResetEmail = (email, resetURL) => {

  console.log("--------------------------------------------------");
  console.log("📧 Simulated Email Sending...");
  console.log(`To: ${email}`);
  console.log("Subject: Password Reset Request");
  console.log("Message:");
  console.log(`Click the link below to reset your password:`);
  console.log(resetURL);
  console.log("--------------------------------------------------");

};