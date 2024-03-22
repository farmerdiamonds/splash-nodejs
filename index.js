import { createNode } from './modules/splashnode.mjs';

const topic = '/splash/offers/1';

const node = await createNode();

function submitOffer(offer){
  node.services.pubsub.publish(topic, new TextEncoder().encode(offer));
}

node.services.pubsub.addEventListener('message', (message) => {
  console.log(new TextDecoder().decode(message.detail.data));
});

node.services.pubsub.subscribe(topic);
