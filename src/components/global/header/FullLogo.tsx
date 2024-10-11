import Image from 'next/image';
import Link from 'next/link';

interface FullLogoProps {
  onLinkClick?: () => void;
  whiteMode?: boolean;
}

export default function FullLogo({ onLinkClick, whiteMode = false }: FullLogoProps) {
  return (
    <Link href="/" className="flex text-2xl" onClick={onLinkClick}>
      <div className="flex">
        <Image
          src="/logo.png"
          width={70}
          height={40}
          alt="Search Cap"
          className={`mr-2 h-9 w-11 ${whiteMode ? 'invert' : ''}`}
        />
        <span className="font-poppins text-3xl font-medium">
          Key
          <span className={`${whiteMode ? 'text-white' : 'text-plasma'}`}>Seer</span>
        </span>
      </div>
    </Link>
  );
}
