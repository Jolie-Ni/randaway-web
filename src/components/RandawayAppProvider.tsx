import { AppProvider } from '@toolpad/core/AppProvider';
import HomePage from './HomePage';


const RandawayAppProvider = () => {

    return (
        <AppProvider
  branding={{ title: 'Randaway' }}
  navigation={[
    {
      segment: 'travel',
      title: 'Travel',
      children: [
        {
          segment: 'locations',
          title: 'Locations',
        },
      ],
    },
  ]}
>
  <HomePage />
</AppProvider>
    );
}

export default RandawayAppProvider;
