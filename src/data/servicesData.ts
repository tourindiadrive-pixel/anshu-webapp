import { ServiceItem } from '../types';

// Import our beautiful, high-resolution pre-generated local assets
// @ts-ignore
import uvImg from '../assets/images/uv_printing_showcase_1781058351498.png';
// @ts-ignore
import ledImg from '../assets/images/luxe_acrylic_neon_1781058369397.png';
// @ts-ignore
import giftImg from '../assets/images/corporate_gift_box_1781058383737.png';
// @ts-ignore
import wedImg from '../assets/images/wedding_invitation_luxe_1781058397753.png';
// @ts-ignore
import awardImg from '../assets/images/trophy_awards_luxe_1781058415275.png';

export const servicesData: ServiceItem[] = [
  {
    id: 'uv-printing',
    title: 'UV Printing',
    description: 'High-definition direct printing on glass, acrylic, metal, and wood with raised gloss textures.',
    longDescription: 'Our industrial-grade Ultraviolet curing printers lay down vibrant layers of eco-solvent inks on virtually any flat substrate. Perfect for high-end signage, luxury smartphone accessories, and architectural panels with selective varnish and gold leaf replication.',
    image: uvImg,
    gallery: [
      {
        id: 'uv-1',
        url: 'https://picsum.photos/seed/uvglass/800/1000',
        title: 'Glass Acrylic Print',
        description: 'Deep-dimensional crystal clear printing with selective varnish gloss layers.',
        width: 800,
        height: 1000
      },
      {
        id: 'uv-2',
        url: 'https://picsum.photos/seed/uvwood/800/600',
        title: 'Matte Wood Block Printing',
        description: 'Eco-friendly UV direct printing showcasing dynamic natural wood grain structures.',
        width: 800,
        height: 600
      },
      {
        id: 'uv-3',
        url: 'https://picsum.photos/seed/uvmetal/600/800',
        title: 'Premium Metal Labels',
        description: 'High-durability direct printing on aluminum plates with localized textured patterns.',
        width: 600,
        height: 800
      },
      {
        id: 'uv-4',
        url: 'https://picsum.photos/seed/uvtexture/800/800',
        title: 'Textured Smartphone Cover',
        description: 'Tactile protective hard cases with premium 3D raised ink textures.',
        width: 800,
        height: 800
      }
    ]
  },
  {
    id: 'led-signage',
    title: 'LED Signage',
    description: 'Stunning luminous glowboards, premium 3D acrylic backlit letters, and designer neon signage.',
    longDescription: 'Turn your storefront or corporate lobby into a beacon of luxury. We design and craft state-of-the-art neon sign boards, dual-lit stainless steel lettering, and architectural lightboxes featuring superior lumen efficiency and premium weather-proofing.',
    image: ledImg,
    gallery: [
      {
        id: 'led-1',
        url: 'https://picsum.photos/seed/ledneon/800/1000',
        title: 'Bespoke Cyber Neon Art',
        description: 'Handcrafted premium neon tubes creating an ambient, luxurious magenta glow.',
        width: 800,
        height: 1000
      },
      {
        id: 'led-2',
        url: 'https://picsum.photos/seed/ledcorp/800/600',
        title: 'Corporate Glow Letters',
        description: 'Polished laser-cut dual-lit stainless steel lettering with solid high-lumen LEDs.',
        width: 800,
        height: 600
      },
      {
        id: 'led-3',
        url: 'https://picsum.photos/seed/ledlobby/600/800',
        title: 'Lobby Custom Signage',
        description: 'Brushed gold architectural plaques with warm floating halo lighting.',
        width: 600,
        height: 800
      },
      {
        id: 'led-4',
        url: 'https://picsum.photos/seed/leddesigner/800/800',
        title: 'Designer Neon Signage',
        description: 'Striking customizable interior glow graphics for cafes, lobbies, and residences.',
        width: 800,
        height: 800
      }
    ]
  },
  {
    id: 'custom-apparel',
    title: 'Custom Apparel',
    description: 'Bespoke luxury heavy-cotton hoodies, corporate high-density prints, and golden embroidery.',
    longDescription: 'Express your team’s identity through high-fashion materials. Offering direct-to-garment (DTG) printing, high-density screen transfers, and precision embroidery, our apparel line feels incredibly comfortable and holds its color through infinite washes.',
    image: 'https://picsum.photos/seed/apparel_cover/800/600',
    gallery: [
      {
        id: 'apparel-1',
        url: 'https://picsum.photos/seed/hoodie/800/1000',
        title: 'High-Density Premium Hoodies',
        description: 'Heavyweight loopback organic cotton hoodies with thick puff screen printing details.',
        width: 800,
        height: 1000
      },
      {
        id: 'apparel-2',
        url: 'https://picsum.photos/seed/dtg/800/600',
        title: 'Custom DTG Print',
        description: 'Photorealistic Direct-to-Garment textile prints matching high-contrast artwork.',
        width: 800,
        height: 600
      },
      {
        id: 'apparel-3',
        url: 'https://picsum.photos/seed/embroidery/600/800',
        title: 'Metallic Gold Embroidery',
        description: 'Intricate 3D golden thread patterns machine embroidered on absolute pure linen fabric.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'laser-marking',
    title: 'Laser Marking',
    description: 'Precision fiber laser etching on copper bottles, cutlery, and metallic instruments.',
    longDescription: 'Using our high-tech fiber and CO2 laser machines, we deliver pristine micro-markings on titanium, stainless steel, premium leather, and anodized aluminum. High-contrast designs that are chemically, physically and UV resistant.',
    image: 'https://picsum.photos/seed/laser_cover/800/600',
    gallery: [
      {
        id: 'laser-1',
        url: 'https://picsum.photos/seed/bottle/800/1000',
        title: 'Custom Matte Vacuum Bottles',
        description: 'Clean laser-scraped monograms on double-walled food-grade metallic water flasks.',
        width: 800,
        height: 1000
      },
      {
        id: 'laser-2',
        url: 'https://picsum.photos/seed/cutlery/800/600',
        title: 'Bespoke Engraved Silver Cutlery',
        description: 'Custom crest marking and detailed typography on luxury sterling silver pieces.',
        width: 800,
        height: 600
      },
      {
        id: 'laser-3',
        url: 'https://picsum.photos/seed/laser_foil/600/800',
        title: 'Foil Marking on Black Cards',
        description: 'Precision hot-foil simulation laser transfers on premium heavy matte black composite business cards.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'corporate-gifting',
    title: 'Corporate Gifting',
    description: 'Bespoke executive gift suites, tech hampers, custom diaries, and luxury welcome kits.',
    longDescription: 'Curate memorable touchpoints for your clients and new hires. Anshu delivers luxury gift chests containing gold-trimmed leather journals, dynamic power banks, customized thermal flasks, and artisanal stationary in high-end rigid-board presentation boxes.',
    image: giftImg,
    gallery: [
      {
        id: 'gift-1',
        url: 'https://picsum.photos/seed/giftbox_ex/800/1000',
        title: 'CEO Executive Hamper',
        description: 'Rigid magnetic presentation chest containing fine black leather organizers and customized gold metal pens.',
        width: 800,
        height: 1000
      },
      {
        id: 'gift-2',
        url: 'https://picsum.photos/seed/gifting_tech/800/600',
        title: 'Smart Tech Welcome Bundle',
        description: 'Coordinated matte-finish tech collection featuring a wireless speaker, fast charger, and matching powerbanks.',
        width: 800,
        height: 600
      },
      {
        id: 'gift-3',
        url: 'https://picsum.photos/seed/gift_letters/600/800',
        title: 'Handmade Luxury Stationery Set',
        description: 'Luxe envelope packs paired with debossed note cards and premium silk-wrapped binding ribbon highlights.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'trophies-awards',
    title: 'Trophies & Awards',
    description: 'Glinting geometric crystal accolades, metal shields, and fine wood engraved crests.',
    longDescription: 'Honor spectacular achievements with awards that look and feel prestigious. Combining laser-engraved luxury optical crystals, CNC-routed dark oak, and polished gold-plated alloys, we craft awards that are displayed with pride.',
    image: awardImg,
    gallery: [
      {
        id: 'award-1',
        url: 'https://picsum.photos/seed/award_crystal/800/1000',
        title: 'Facet Highlight Crystal Trophy',
        description: 'Prism-cut glass trophy catching ambient light, beautifully etched using sub-surface laser technology.',
        width: 800,
        height: 1000
      },
      {
        id: 'award-2',
        url: 'https://picsum.photos/seed/award_gold/800/600',
        title: 'Gold Star Alloy Awards',
        description: 'Luxury mirror-polished 24K electroplated golden star sculptures placed securely on dark granite podium blocks.',
        width: 800,
        height: 600
      },
      {
        id: 'award-3',
        url: 'https://picsum.photos/seed/award_oak/600/800',
        title: 'Monolithic Oak Award Block',
        description: 'Textile-embossed bronze metal badges mounted cleanly onto hand-planed dense oak display slabs.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'digital-printing',
    title: 'Digital Printing',
    description: 'High-speed premium document printing, foil stamped brochures, and velvet marketing materials.',
    longDescription: 'Ensure high fidelity and perfect alignment. Using ultra-modern digital presses, we create premium soft-touch catalogs, gold-foiled brochures, luxury menus, and custom flyers carrying absolute color accuracy.',
    image: 'https://picsum.photos/seed/digital_cover/800/600',
    gallery: [
      {
        id: 'digital-1',
        url: 'https://picsum.photos/seed/brochure/800/1000',
        title: 'Foil-Edge Corporate Brochure',
        description: 'Corporate publications with double-sided gold gilding border accents on 250GSM fine papers.',
        width: 800,
        height: 1000
      },
      {
        id: 'digital-2',
        url: 'https://picsum.photos/seed/art_book/800/600',
        title: 'Textured Fine Art Portfolio',
        description: 'Luxury design and photography portfolio booklets carrying a high-contrast heavy cardboard sleeve.',
        width: 800,
        height: 600
      },
      {
        id: 'digital-3',
        url: 'https://picsum.photos/seed/business_cards/600/800',
        title: 'Heavy cardstock Business Cards',
        description: 'Ultra-premium 600GSM cotton fiber duplex board business cards carrying debossed logotypes.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'custom-packaging',
    title: 'Custom Packaging',
    description: 'Luxurious rigid magnetic boards, gold-crested cosmetic boxes, and bespoke paper bags.',
    longDescription: 'The unboxing experience represents your biggest brand billboard. We custom construct rigid boxes, sleeve packages, collapsible magnetic gift cases, and luxury paper bags with ribbon handles and premium metal eyelets.',
    image: 'https://picsum.photos/seed/packaging_cover/800/600',
    gallery: [
      {
        id: 'pack-1',
        url: 'https://picsum.photos/seed/velvet_box/800/1000',
        title: 'Luxury Velvet Rigid Box',
        description: 'Elegant jewelry and watch storage box customized in dark navy velvet with hot brass foil print.',
        width: 800,
        height: 1000
      },
      {
        id: 'pack-2',
        url: 'https://picsum.photos/seed/perfume_box/800/600',
        title: 'Embossed Perfume Case',
        description: 'Premium cosmetic hollow structural carton sleeves textured using die-cut raised graphics.',
        width: 800,
        height: 600
      },
      {
        id: 'pack-3',
        url: 'https://picsum.photos/seed/shopping_bag/600/800',
        title: 'Premium Shopping Tote Bags',
        description: 'Luxury designer brand carrying pack crafted in matte textured paper and complete with plush satin ribbons.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'id-lanyards',
    title: 'ID & Lanyards',
    description: 'Satin lanyards with metal buckles, multi-color high density print, and smart RFID badges.',
    longDescription: 'Establish visual authority at work and events. We supply gorgeous double-hook satin lanyards, precision printed silicone entry bands, smart micro-chip proximity access cards, and matte metal staff badges.',
    image: 'https://picsum.photos/seed/id_cover/800/600',
    gallery: [
      {
        id: 'id-1',
        url: 'https://picsum.photos/seed/lanyard_details/800/1000',
        title: 'Custom High-Density Lanyards',
        description: 'Thick-woven dual-hook lanyards sporting sharp corporate silk-screen brand printing.',
        width: 800,
        height: 1000
      },
      {
        id: 'id-2',
        url: 'https://picsum.photos/seed/rfid_card/800/600',
        title: 'Matte Executive RFID Cards',
        description: 'Security NFC keycards designed in high-contrast matte finishes carrying magnetic metallic lines.',
        width: 800,
        height: 600
      },
      {
        id: 'id-3',
        url: 'https://picsum.photos/seed/badge_holder/600/800',
        title: 'Conference Premium Badges',
        description: 'Oversized events clearance badge holders complete with textured clip lines and color bands.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'home-decor',
    title: 'Home Decor',
    description: 'Bespoke floating acrylic framing, custom designer wall clocks, and luxury accent mirrors.',
    longDescription: 'Infuse your private sanctuary with luxury accents. We manufacture custom borderless acrylic photo prints with standoff bolts, high-precision engraved wooden map models, geometric clock mechanics, and printed glass headboards.',
    image: 'https://picsum.photos/seed/decor_cover/800/600',
    gallery: [
      {
        id: 'decor-1',
        url: 'https://picsum.photos/seed/acrylic_photo/800/1000',
        title: 'Frameless Floating Acrylic print',
        description: 'Vivid gallery-quality printed photography mounted under block-polished thick acrylic slabs with solid steel stand-off pins.',
        width: 800,
        height: 1000
      },
      {
        id: 'decor-2',
        url: 'https://picsum.photos/seed/wall_clock/800/600',
        title: 'Luxury Marbled Wall Clock',
        description: 'Stalwart wall clock crafted with custom structured quartz hands ticking smoothly on deep printed slate patterns.',
        width: 800,
        height: 600
      },
      {
        id: 'decor-3',
        url: 'https://picsum.photos/seed/ceramic_vase/600/800',
        title: 'Artist Edition Printed Vase',
        description: 'Custom ceramic display flower vases layered with detailed high-precision circular direct UV ink applications.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'wedding-stationery',
    title: 'Wedding Stationery',
    description: 'Exquisite wax seal invites, hand-deckled luxury cotton papers, and monogram cards.',
    longDescription: 'Curate your momentous announcements in absolute splendor. Our artisans specialize in bespoke wedding invitations boasting elegant royal deckled cotton papers, pristine hot foil stamping, custom wax seal monograms, and custom transparent elements.',
    image: wedImg,
    gallery: [
      {
        id: 'wed-1',
        url: 'https://picsum.photos/seed/wedding_invite/800/1000',
        title: 'Royal Deckled Invite Suite',
        description: 'Intimately designed organic deckle-edge wedding stationery suite closed using traditional emerald-green wax markings.',
        width: 800,
        height: 1000
      },
      {
        id: 'wed-2',
        url: 'https://picsum.photos/seed/wedding_gold_foil/800/600',
        title: 'Gold Hot Foil Invitations',
        description: 'Extravagant metallic rose-gold foil stamped calligraphy pressed deeply into luxury textured velvet cardstock paper.',
        width: 800,
        height: 600
      },
      {
        id: 'wed-3',
        url: 'https://picsum.photos/seed/wedding_acrylic/600/800',
        title: 'Acrylic Glass Invite Plaque',
        description: 'Unique custom transparent acrylic sheets etched with fine white and gold serif lettering.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'photo-gifts',
    title: 'Photo Gifts',
    description: 'High-density desk acrylic blocks, heavy wooden blocks, and metal photo prints.',
    longDescription: 'Eternize precious memories into luxury centerpieces. We seal high-resolution photos on 1-inch thick diamond-polished acrylic desk block panels, providing brilliant refractive depth and high light transmission.',
    image: 'https://picsum.photos/seed/photogifts_cover/800/600',
    gallery: [
      {
        id: 'photo-1',
        url: 'https://picsum.photos/seed/acrylic_block/800/1000',
        title: 'Luxe Stand-On Acrylic Keepsake',
        description: 'High-gloss freestanding optical art blocks polished to perfection for executive desktops.',
        width: 800,
        height: 1000
      },
      {
        id: 'photo-2',
        url: 'https://picsum.photos/seed/leather_album/800/600',
        title: 'Engraved Leather Album Box',
        description: 'Hand-sewn heavy photo albums wrapped in supple full-grain tan leather with laser burned title blocks.',
        width: 800,
        height: 600
      },
      {
        id: 'photo-3',
        url: 'https://picsum.photos/seed/mdf_frame/600/800',
        title: 'Custom Laser MDF Frames',
        description: 'Exquisitely carved and assembled wooden puzzle framing displaying high-density matte prints.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'skins-wraps',
    title: 'Skins & Wraps',
    description: 'Deep-textured carbon fiber phone skins, leatherette notebook coverings, and metallic car wraps.',
    longDescription: 'Ensure absolute scratch resistance with stunning bespoke patterns. We custom cut premium 3M cast vinyl templates for mobile phones, digital cameras, and vehicles, guaranteeing bubble-free application and residue-free removal.',
    image: 'https://picsum.photos/seed/skinswraps_cover/800/600',
    gallery: [
      {
        id: 'skin-1',
        url: 'https://picsum.photos/seed/carbon_skin/800/1000',
        title: 'Carbon-Fiber Phone Skin',
        description: 'Ultra-thin, structural carbon fiber 3D pattern wrap with micrometer-precision openings for cameras and sensors.',
        width: 800,
        height: 1000
      },
      {
        id: 'skin-2',
        url: 'https://picsum.photos/seed/laptop_skin/800/600',
        title: 'Premium Leatherette Laptop Cover',
        description: 'Matte composite skin block providing high-end leather pebble finishes to notebooks.',
        width: 800,
        height: 600
      },
      {
        id: 'skin-3',
        url: 'https://picsum.photos/seed/gold_wrap/600/800',
        title: 'Gold Chrome Wrap Detail',
        description: 'Premium automotive-grade high-gloss chromium wraps providing an impeccable specular metallic gold surface.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'canvas-art',
    title: 'Canvas Art',
    description: 'Museum-grade heavy canvas, rich fine art giclée prints, and wooden wall hangers.',
    longDescription: 'Elevate your halls to curated public galleries. Our museum-grade poly-cotton canvas prints utilize non-fading archival pigment inks stretched beautifully across sustainably-harvested timber float frames.',
    image: 'https://picsum.photos/seed/canvasart_cover/800/600',
    gallery: [
      {
        id: 'canvas-1',
        url: 'https://picsum.photos/seed/museum_canvas/800/1000',
        title: 'Museum Canvas Wrap',
        description: 'Rich, high-density cotton texturing with dynamic fine-art brushstrokes reproduced using archival pigment inks.',
        width: 800,
        height: 1000
      },
      {
        id: 'canvas-2',
        url: 'https://picsum.photos/seed/triptych_art/800/600',
        title: 'Contemporary Triptych art',
        description: 'A stunning modern three-panel continuous wall hanging layout printed across heavy archival canvas.',
        width: 800,
        height: 600
      },
      {
        id: 'canvas-3',
        url: 'https://picsum.photos/seed/gold_foil_canvas/600/800',
        title: 'Golden Accent Custom Foil Canvas',
        description: 'High-contrast abstract graphic canvas elements decorated using handcrafted real golden leaf overlay sparkles.',
        width: 600,
        height: 800
      }
    ]
  },
  {
    id: 'restaurant-branding',
    title: 'Restaurant Branding',
    description: 'Bespoke heat-debossed leather menus, engraved bill chests, and copper custom tables.',
    longDescription: 'Establish visual synergy throughout your dining space. We customize executive leather-bound menus, laser marked wooden bill boxes, engraved premium metal water containers, and customized corporate staff aprons.',
    image: 'https://picsum.photos/seed/restaurant_cover/800/600',
    gallery: [
      {
        id: 'rest-1',
        url: 'https://picsum.photos/seed/leather_menu/800/1000',
        title: 'Custom Debossed Leather Menu',
        description: 'Heat-pressed authentic dark brown leather book menu jackets styled in pristine luxury minimalisms.',
        width: 800,
        height: 1000
      },
      {
        id: 'rest-2',
        url: 'https://picsum.photos/seed/bar_neon/800/600',
        title: 'Neon Light Bar Overlay',
        description: 'Sleek background signage casting beautiful mood accents over active dining areas.',
        width: 800,
        height: 600
      },
      {
        id: 'rest-3',
        url: 'https://picsum.photos/seed/cedar_box/600/800',
        title: 'Engraved Cedar Bill boxes',
        description: 'Scented genuine cedarwood service folders carrying laser burnished brand typography.',
        width: 600,
        height: 800
      }
    ]
  }
];
