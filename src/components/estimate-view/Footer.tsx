// components/estimate-view/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="bg-white py-6 mt-8 border-t">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} FH Resolve - Todos os direitos reservados</p>
        <p className="mt-1">CNPJ: 00.000.000/0000-00</p>
      </div>
    </footer>
  );
}