import Link from 'next/link';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function NavbarItems({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
      {/* TODO: Dirty hack becasue of weird alignment issue */}
      <NavigationMenuItem className="hidden w-full">
        <NavigationMenuTrigger className="w-full justify-start">
          <span className="text-[16px]">Tools</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="flex w-full flex-col gap-1 p-1">
            <Link href="/keywords-lookup" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} w-full justify-start`}
                onClick={onLinkClick}
              >
                Keywords Lookup
              </NavigationMenuLink>
            </Link>
            <Link href="/keyword-breakdown" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} w-full justify-start`}
                onClick={onLinkClick}
              >
                Keyword Breakdown
              </NavigationMenuLink>
            </Link>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem className="w-full">
        <NavigationMenuTrigger className="w-full justify-start bg-transparent focus:outline-none">
          <span className="text-[16px]">Tools</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="flex w-full flex-col gap-1 p-1">
            <Link href="/keywords-lookup" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} w-full justify-start`}
                onClick={onLinkClick}
              >
                Keywords Lookup
              </NavigationMenuLink>
            </Link>
            <Link href="/keyword-breakdown" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} w-full justify-start`}
                onClick={onLinkClick}
              >
                Keyword Breakdown
              </NavigationMenuLink>
            </Link>
            <Link href="/keyword-discovery" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} w-full justify-start`}
                onClick={onLinkClick}
              >
                Keyword Discovery
              </NavigationMenuLink>
            </Link>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem className="w-full">
        <Link href="/#features" legacyBehavior passHref className="w-full">
          <NavigationMenuLink
            className={`${navigationMenuTriggerStyle()} w-full justify-start bg-transparent focus:outline-none`}
            onClick={onLinkClick}
          >
            <span className="text-[16px]">Features</span>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className="w-full">
        <Link href="/#pricing" legacyBehavior passHref className="w-full">
          <NavigationMenuLink
            className={`${navigationMenuTriggerStyle()} w-full justify-start bg-transparent focus:outline-none`}
            onClick={onLinkClick}
          >
            <span className="text-[16px]">Pricing</span>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  );
}
