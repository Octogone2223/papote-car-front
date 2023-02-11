export const errorsHandler = (errors: string): { [key: string]: string[] } => {
  const temp =
    'email must be an email,password must be at least 6 characters,email already exists,email not found,password is incorrect';

  const errorsArray = temp.split(',').reduce((acc: any, error: string) => {
    const [key, value] = [error.split(' ')[0], error];
    acc[key] = [...(acc[key] || []), value];
    return acc;
  }, {});

  return errorsArray;
};
