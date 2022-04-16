import ClientError from '../components/Errors/ClientError';

const FourOhThree = () => {
  return (
    <ClientError
      code="403"
      title="Huh! Not that easy."
      body="You are not authorized to view this page."
    />
  );
};

export default FourOhThree;
