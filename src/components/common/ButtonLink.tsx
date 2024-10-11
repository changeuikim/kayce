import React from 'react';
import Link from '@/components/common/Link';
import { Button, ButtonProps } from '@/components/ui/button';

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, ...props }) => {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default ButtonLink;
