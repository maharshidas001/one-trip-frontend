import { cn } from '@/lib/utils';
import React, { type FC } from 'react'

interface IMaxWidthProp {
  children: React.ReactNode;
  className?: string;
};

const MaxWidth: FC<IMaxWidthProp> = ({ children, className }) => {
  return (
    <>
      <div className={cn('w-full px-3 max-w-screen-xl mx-auto', className)}>
        {children}
      </div>
    </>
  )
}

export default MaxWidth;