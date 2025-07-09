'use client';

export default function EditClientPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Edit Client ID: {params.id}</h2>
      {/* Later: pre-fill ClientForm with data */}
    </div>
  );
}
