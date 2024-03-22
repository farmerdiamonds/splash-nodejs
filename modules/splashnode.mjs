import { createLibp2p } from 'libp2p';
import { tcp } from '@libp2p/tcp';
import { bootstrap } from '@libp2p/bootstrap';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { kadDHT } from '@libp2p/kad-dht';
import { gossipsub } from '@chainsafe/libp2p-gossipsub';

async function createNode() {
  const bootstrapers = [
    "/dnsaddr/splash.dexie.space/p2p/12D3KooWM1So76jzugAettgrfA1jfcaKA66EAE6k1zwAT3oVzcnK",
    "/dnsaddr/splash.dexie.space/p2p/12D3KooWCLvBXPohyMUKhbRrkcfRRkMLDfnCqyCjNSk6qyfjLMJ8",
    "/dnsaddr/splash.dexie.space/p2p/12D3KooWP6QDYTCccwfUQVAc6jQDvzVY1FtU3WVsAxmVratbbC5V"
  ];
  return await createLibp2p({
    connectionManager: {
      maxConnections: 10,
      minConnections: 1,
      maxIncomingPendingConnection: 5
    },
    addresses: {
      listen: ['/ip4/127.0.0.1/tcp/15000']
    },
    transports: [tcp()],
    connectionEncryption: [noise()],
    streamMuxers: [yamux()],
    peerDiscovery: [
      bootstrap({
        list: bootstrapers
      })
    ],
    services: {
      dht: kadDHT({
      }),
      pubsub: gossipsub({
      })
    }
  });
}

export {createNode}