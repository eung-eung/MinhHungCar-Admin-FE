'use client'
import '@/app/i18n';

export default function I18nProvider(
    {
        children
    }: {
        children: React.ReactNode,
    }
) {


    return <>{children}</>
}