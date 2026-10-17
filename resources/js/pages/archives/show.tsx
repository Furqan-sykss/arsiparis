import { Head, Link } from "@inertiajs/react";

type Tag = {
    id: number;
    name: string;
};

type Category = {
    id: number;
    name: string;
};

type ArchiveType = {
    id: number;
    name: string;
};

type Unit = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
};

type Archive = {
    id: number;
    archive_number: string;
    document_date: string;
    subject: string;
    sender: string | null;
    recipient: string | null;
    status: string;
    description: string | null;
    category: Category | null;
    archiveType: ArchiveType | null;
    unit: Unit | null;
    uploader: User | null;
    tags: Tag[];
};

type Props = {
    archive: Archive;
};

function formatDate(date: string) {
    const value = new Date(date);

    return value.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function ArchiveShow({ archive }: Props) {
    return (
        <>
            <Head title={`Arsip ${archive.archive_number}`} />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/archives"
                        className="text-muted-foreground hover:text-foreground text-sm"
                    >
                        ← Kembali ke Daftar Arsip
                    </Link>

                    <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Detail Arsip
                            </h1>

                            <p className="text-muted-foreground mt-1">
                                Informasi lengkap mengenai arsip yang tersimpan
                                dalam sistem.
                            </p>
                        </div>

                        <Link
                            href={`/archives/${archive.id}/edit`}
                            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
                        >
                            Edit Arsip
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Informasi Arsip */}
                    <section className="border-border rounded-xl border p-6">
                        <h2 className="text-lg font-semibold">
                            Informasi Arsip
                        </h2>

                        <p className="text-muted-foreground mt-1 text-sm">
                            Informasi dasar mengenai dokumen.
                        </p>

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Nomor Arsip
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.archive_number}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Tanggal Dokumen
                                </p>

                                <p className="mt-1 font-medium">
                                    {formatDate(archive.document_date)}
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <p className="text-muted-foreground text-sm">
                                    Subjek
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.subject}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Pengirim
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.sender || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Penerima
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.recipient || "-"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Klasifikasi */}
                    <section className="border-border rounded-xl border p-6">
                        <h2 className="text-lg font-semibold">
                            Klasifikasi Arsip
                        </h2>

                        <p className="text-muted-foreground mt-1 text-sm">
                            Kategori dan klasifikasi dokumen.
                        </p>

                        <div className="mt-6 grid gap-6 md:grid-cols-4">
                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Kategori
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.category?.name || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Tipe Arsip
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.archiveType?.name || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Unit
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.unit?.name || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Status
                                </p>

                                <p className="mt-1 font-medium capitalize">
                                    {archive.status}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Tag */}
                    <section className="border-border rounded-xl border p-6">
                        <h2 className="text-lg font-semibold">Tag</h2>

                        <p className="text-muted-foreground mt-1 text-sm">
                            Tag yang terkait dengan arsip.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {archive.tags.length > 0 ? (
                                archive.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="bg-muted rounded-full px-3 py-1 text-sm"
                                    >
                                        {tag.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-muted-foreground text-sm">
                                    Tidak ada tag.
                                </span>
                            )}
                        </div>
                    </section>

                    {/* Deskripsi */}
                    <section className="border-border rounded-xl border p-6">
                        <h2 className="text-lg font-semibold">Deskripsi</h2>

                        <p className="text-muted-foreground mt-1 text-sm">
                            Keterangan tambahan mengenai arsip.
                        </p>

                        <div className="bg-muted/30 mt-5 rounded-lg p-4">
                            <p className="text-sm leading-6 whitespace-pre-wrap">
                                {archive.description || "Tidak ada deskripsi."}
                            </p>
                        </div>
                    </section>

                    {/* Metadata */}
                    <section className="border-border rounded-xl border p-6">
                        <h2 className="text-lg font-semibold">
                            Informasi Sistem
                        </h2>

                        <div className="mt-5 grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Diunggah oleh
                                </p>

                                <p className="mt-1 font-medium">
                                    {archive.uploader?.name || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-sm">
                                    ID Arsip
                                </p>

                                <p className="mt-1 font-medium">
                                    #{archive.id}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
