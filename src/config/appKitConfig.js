import { createAppKit, useAppKit } from '@reown/appkit/vue'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { opBNB, arbitrum } from '@reown/appkit/networks'


const projectId = 'a69a89d4f6feasdada56d30d0af75dc'


const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}


createAppKit({
  adapters: [new Ethers5Adapter()],
  projectId,
  metadata,
  networks: [opBNB],
  features: {
    analytics: true,
    connectMethodsOrder: ['wallet'],
  },

})


const modal = useAppKit()

export default modal
