export const mapAuthError = (err: any) => {
  const code = err?.response?.data?.code;
  const message = err?.response?.data?.message;

  switch (code) {
    case 1001:
      return { email: "Email already exists" };
    case 1002:
      return { phone: "Phone number already exists" };
    default:
      return { email: message || "Something went wrong" };
  }
};
