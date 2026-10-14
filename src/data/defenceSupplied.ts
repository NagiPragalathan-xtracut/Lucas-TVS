import {
  Boxes,
  CloudRain,
  Droplets,
  Fan,
  Power,
  RotateCw,
  Settings2,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import defenceBattleTanks from '../assets/DefenceSupplied/battle-tanks.webp'
import defenceSpecialVehicles from '../assets/DefenceSupplied/special-vehicles.webp'
import defenceHighMobility from '../assets/DefenceSupplied/high-mobility.webp'

export type DefencePlatform = {
  name: string
  image: string
  imageAlt: string
  products: { label: string; icon: LucideIcon }[]
}

/**
 * Products supplied into defence platforms (14 Oct), from the client's
 * defence product sheet — every line on it, grouped by platform as the
 * sheet groups them. Photos are cropped from the same sheet (vehicle and
 * components together, on white).
 */
export const DEFENCE_PLATFORMS: DefencePlatform[] = [
  {
    name: 'Armoured Battle Tanks',
    image: defenceBattleTanks,
    imageAlt: 'A main battle tank beside a starter generator, a motor and a control unit',
    products: [
      { label: 'Starter Generators', icon: Zap },
      { label: 'Ventilations', icon: Fan },
      { label: 'Automatic Loading Gear (ALG)', icon: Settings2 },
      { label: 'Sub Systems', icon: Boxes },
    ],
  },
  {
    name: 'Armoured Special Vehicles',
    image: defenceSpecialVehicles,
    imageAlt: 'Two armoured special vehicles beside two high-output alternators',
    products: [
      { label: 'High Output Alternators', icon: RotateCw },
      { label: 'Wiper Motors', icon: Droplets },
    ],
  },
  {
    name: 'High Mobility Vehicles',
    image: defenceHighMobility,
    imageAlt: 'A high-mobility military truck beside windshield wipers and an alternator',
    products: [
      { label: 'Alternators', icon: RotateCw },
      { label: 'Starter Motors', icon: Power },
      { label: 'Windshield Wiper Motor System', icon: CloudRain },
    ],
  },
]
