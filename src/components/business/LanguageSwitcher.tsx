// RUTA: src/components/business/LanguageSwitcher.tsx
/**
 * @file LanguageSwitcher.tsx
 * @description Componente de negocio para seleccionar el idioma de la aplicación.
 * @version 11.1.0 (Typo Correction): Se corrige un error tipográfico en las props
 *              del componente <Image />, resolviendo la violación de contrato TS2322.
 * @author L.I.A. Legacy
 */
'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from '@/navigation.client';
import { locales } from '@/i18n.config';
import { logger } from '@/shared/logging';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const localeToCountryCode: { [key: string]: string } = {
  'en-US': 'us',
  'es-ES': 'es',
  'pt-BR': 'br',
  'it-IT': 'it',
};

const languageNames: { [key: string]: string } = {
  'en-US': 'English',
  'es-ES': 'Español',
  'pt-BR': 'Português',
  'it-IT': 'Italiano',
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: string) => {
    if (isPending || locale === nextLocale) return;

    const group = logger.startGroup('LanguageSwitcher.handleLanguageChange');
    logger.info(
      `Cambio de idioma solicitado a: ${nextLocale}`,
      { from: locale, to: nextLocale, currentPath: pathname },
      group.groupId
    );

    startTransition(() => {
      const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
      router.replace(newPath);

      logger.success(
        `Transición de idioma iniciada para: ${nextLocale}`,
        { newPath: newPath, newLocale: nextLocale },
        group.groupId
      );
    });
    logger.endGroup(group.groupId);
  };

  const currentCountryCode = localeToCountryCode[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {currentCountryCode && (
            <Image
              src={`/flags/${currentCountryCode}.svg`}
              alt={locale}
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
          )}
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((lang) => {
          const countryCode = localeToCountryCode[lang];
          return (
            <DropdownMenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              disabled={isPending || locale === lang}
              className="flex items-center gap-2"
            >
              <Image
                src={`/flags/${countryCode}.svg`}
                alt={lang}
                width={16}
                height={16}
                className="rounded-full object-cover"
              />
              {languageNames[lang]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
