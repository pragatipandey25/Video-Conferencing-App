'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';

const NavbarAuthControls = () => {
  return (
    <SignedIn>
      <UserButton afterSignOutUrl="/sign-in" />
    </SignedIn>
  );
};

export default NavbarAuthControls;
