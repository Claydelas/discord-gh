import type { NextPage } from 'next';

// TODO: MongoDB/Firebase storage of user preferances
// TODO: OAuth2 authentication with Discord
const Home: NextPage = () => {
  return (
    <div className='flex items-center justify-center h-screen max-w-md mx-auto'>
      <p className='border-2 p-5 border-black'>
        This page will be used for authentication to Discord and setting user
        preferences for which servers/channels/users one wants to be considered
        when asking Google or fetching the API.
      </p>
    </div>
  );
};

export default Home;
