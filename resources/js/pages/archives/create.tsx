import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

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

type Tag = {
    id: number;
    name: string;
};

type FormData = {
    archive_number: string;
    document_date: string;
    subject: string;
    sender: string;
    recipient: string;
    archive_type_id: string;
    category_id: string;
    unit_id: string;
    status: string;
    description: string;
    tags: number[];
};

type Props = {
    categories: Category[];
    archiveTypes: ArchiveType[];
    units: Unit[];
    tags: Tag[];
};

export default function ArchivesCreate({
    categories,
    archiveTypes,
    units,
    tags,
}: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        archive_number: '',
        document_date: '',
        subject: '',
        sender: '',
        recipient: '',
        archive_type_id: '',
        category_id: '',
        unit_id: '',
        status: 'uploaded',
        description: '',
        tags: [],
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        post('/archives');
    };

    const toggleTag = (tagId: number) => {
        if (data.tags.includes(tagId)) {
            setData(
                'tags',
                data.tags.filter((id) => id !== tagId),
            );
        } else {
            setData('tags', [...data.tags, tagId]);
        }
    };

    return (
        <>
            <Head title="Tambah Arsip" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="mb-2">
                        <Link
                            href="/archives"
                            className="text-muted-foreground hover:text-foreground text-sm"
                        >
                            ← Kembali ke Daftar Arsip
                        </Link>
                    </div>

                    <h1 className="text-2xl font-semibold">Tambah Arsip</h1>

                    <p className="text-muted-foreground mt-1">
                        Tambahkan data arsip baru ke dalam sistem.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submit}>
                    <div className="space-y-6">
                        {/* Informasi Utama */}
                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">
                                Informasi Arsip
                            </h2>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Informasi dasar mengenai dokumen yang akan
                                diarsipkan.
                            </p>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                {/* Nomor Arsip */}
                                <div>
                                    <label
                                        htmlFor="archive_number"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Nomor Arsip{' '}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="archive_number"
                                        type="text"
                                        value={data.archive_number}
                                        onChange={(event) =>
                                            setData(
                                                'archive_number',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Contoh: ARS-2026-0004"
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    />

                                    {errors.archive_number && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.archive_number}
                                        </p>
                                    )}
                                </div>

                                {/* Tanggal */}
                                <div>
                                    <label
                                        htmlFor="document_date"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Tanggal Dokumen{' '}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="document_date"
                                        type="date"
                                        value={data.document_date}
                                        onChange={(event) =>
                                            setData(
                                                'document_date',
                                                event.target.value,
                                            )
                                        }
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    />

                                    {errors.document_date && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.document_date}
                                        </p>
                                    )}
                                </div>

                                {/* Subjek */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Subjek{' '}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        id="subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(event) =>
                                            setData(
                                                'subject',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Masukkan subjek atau perihal dokumen"
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    />

                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Pengirim */}
                                <div>
                                    <label
                                        htmlFor="sender"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Pengirim
                                    </label>

                                    <input
                                        id="sender"
                                        type="text"
                                        value={data.sender}
                                        onChange={(event) =>
                                            setData(
                                                'sender',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Nama instansi atau pihak pengirim"
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    />

                                    {errors.sender && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.sender}
                                        </p>
                                    )}
                                </div>

                                {/* Penerima */}
                                <div>
                                    <label
                                        htmlFor="recipient"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Penerima
                                    </label>

                                    <input
                                        id="recipient"
                                        type="text"
                                        value={data.recipient}
                                        onChange={(event) =>
                                            setData(
                                                'recipient',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Nama instansi atau pihak penerima"
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    />

                                    {errors.recipient && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.recipient}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Klasifikasi */}
                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">
                                Klasifikasi Arsip
                            </h2>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Tentukan kategori, tipe, unit, dan status
                                dokumen.
                            </p>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                {/* Kategori */}
                                <div>
                                    <label
                                        htmlFor="category_id"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Kategori
                                    </label>

                                    <select
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={(event) =>
                                            setData(
                                                'category_id',
                                                event.target.value,
                                            )
                                        }
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    >
                                        <option value="">Pilih kategori</option>

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                {/* Tipe */}
                                <div>
                                    <label
                                        htmlFor="archive_type_id"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Tipe Arsip
                                    </label>

                                    <select
                                        id="archive_type_id"
                                        value={data.archive_type_id}
                                        onChange={(event) =>
                                            setData(
                                                'archive_type_id',
                                                event.target.value,
                                            )
                                        }
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    >
                                        <option value="">
                                            Pilih tipe arsip
                                        </option>

                                        {archiveTypes.map((type) => (
                                            <option
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.archive_type_id && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.archive_type_id}
                                        </p>
                                    )}
                                </div>

                                {/* Unit */}
                                <div>
                                    <label
                                        htmlFor="unit_id"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Unit
                                    </label>

                                    <select
                                        id="unit_id"
                                        value={data.unit_id}
                                        onChange={(event) =>
                                            setData(
                                                'unit_id',
                                                event.target.value,
                                            )
                                        }
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    >
                                        <option value="">Pilih unit</option>

                                        {units.map((unit) => (
                                            <option
                                                key={unit.id}
                                                value={unit.id}
                                            >
                                                {unit.name}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.unit_id && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.unit_id}
                                        </p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Status{' '}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(event) =>
                                            setData(
                                                'status',
                                                event.target.value,
                                            )
                                        }
                                        className="bg-background focus:ring-primary w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2"
                                    >
                                        <option value="uploaded">
                                            Uploaded
                                        </option>

                                        <option value="verified">
                                            Verified
                                        </option>

                                        <option value="archived">
                                            Archived
                                        </option>
                                    </select>

                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tag */}
                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">Tag</h2>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Pilih satu atau beberapa tag yang sesuai dengan
                                arsip.
                            </p>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {tags.map((tag) => {
                                    const checked = data.tags.includes(tag.id);

                                    return (
                                        <label
                                            key={tag.id}
                                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                                                checked
                                                    ? 'border-primary bg-primary/10'
                                                    : 'hover:bg-muted/50'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() =>
                                                    toggleTag(tag.id)
                                                }
                                                className="h-4 w-4 rounded"
                                            />

                                            <span className="text-sm">
                                                {tag.name}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>

                            {errors.tags && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.tags}
                                </p>
                            )}

                            {errors['tags.0'] && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors['tags.0']}
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">Deskripsi</h2>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Tambahkan keterangan tambahan jika diperlukan.
                            </p>

                            <div className="mt-5">
                                <textarea
                                    id="description"
                                    rows={5}
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Masukkan deskripsi atau keterangan arsip..."
                                    className="bg-background focus:ring-primary w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href="/archives"
                                className="hover:bg-muted rounded-lg border px-5 py-2.5 text-sm font-medium transition"
                            >
                                Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Arsip'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
