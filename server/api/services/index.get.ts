const services = [
  {
    id: 1, num: '01',
    title: 'Wedding Films',
    desc: 'Full-day coverage with cinematic storytelling. From morning prep to the last dance — captured with two operators, color-graded for screen and print.',
    tags: ['Cinematic highlight reel', 'Full ceremony & reception', 'Drone footage', 'Color graded edit'],
    priceLabel: 'Starting from', price: 'PKR 80,000',
  },
  {
    id: 2, num: '02',
    title: 'Corporate & Brand Films',
    desc: 'Visual narratives that elevate brand identity. From concept to final grade — stills and motion produced together, end-to-end.',
    tags: ['Concept development', 'Multiple revisions', 'Branded delivery', 'Usage rights'],
    priceLabel: 'Starting from', price: 'PKR 50,000',
  },
  {
    id: 3, num: '03',
    title: 'Photography — Weddings & Events',
    desc: 'Full-day photo coverage for weddings, nikkah ceremonies, and events. Quiet, considered direction — delivered as a curated online gallery.',
    tags: ['Full-day coverage', '200+ edited images', 'Online gallery', 'Print-ready files'],
    priceLabel: 'Starting from', price: 'PKR 25,000',
  },
  {
    id: 4, num: '04',
    title: 'Commercial Photography',
    desc: 'Product, lifestyle and editorial stills for brands. Studio or on-location — concept through delivery with full commercial license.',
    tags: ['Product & lifestyle', 'Studio & on-location', 'Commercial license', 'Edited deliverables'],
    priceLabel: 'Starting from', price: 'PKR 35,000',
  },
  {
    id: 5, num: '05',
    title: 'Aerial / Drone Coverage',
    desc: 'Licensed drone operator delivering cinematic 4K aerials for weddings, events, and brand productions. Available standalone or as an add-on.',
    tags: ['Licensed operator', '4K footage', 'Cinematic grading', 'Standalone or add-on'],
    priceLabel: 'Starting from', price: 'PKR 20,000',
  },
]

export default defineEventHandler(async () => {
  return services
})
