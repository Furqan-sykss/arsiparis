import { Head, Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { route } from "@/lib/route";

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

type Archive = {
    id: number;
    archive_number: string;
    document_date: string;
    subject: string;
    sender: string | null;
    recipient: string | null;
    archive_type_id: number | null;
    category_id: number | null;
    unit_id: number | null;
    status: string;
    description: string | null;
    tags?: Tag[];
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
    archive: Archive;
    categories: Category[];
    archiveTypes: ArchiveType[];
    units: Unit[];
    tags: Tag[];
};

export default function ArchivesEdit({
    archive,
    categories,
    archiveTypes,
    units,
    tags,
}: Props) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        archive_number: archive.archive_number,
        document_date: archive.document_date.substring(0, 10),
        subject: archive.subject,
        sender: archive.sender ?? "",
        recipient: archive.recipient ?? "",
        archive_type_id: archive.archive_type_id?.toString() ?? "",
        category_id: archive.category_id?.toString() ?? "",
        unit_id: archive.unit_id?.toString() ?? "",
        status: archive.status,
        description: archive.description ?? "",
        tags: archive.tags?.map((tag) => tag.id) ?? [],
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        console.log("SUBMIT EDIT:", {
            url: route("archives.update", archive.id),
            data,
        });

        put(route("archives.update", archive.id), {
            onStart: () => {
                console.log("UPDATE START");
            },
            onSuccess: () => {
                console.log("UPDATE SUCCESS");
            },
            onError: (errors) => {
                console.error("UPDATE ERROR:", errors);
            },
            onFinish: () => {
                console.log("UPDATE FINISH");
            },
        });
    };

    const toggleTag = (tagId: number) => {
        if (data.tags.includes(tagId)) {
            setData(
                "tags",
                data.tags.filter((id) => id !== tagId),
            );
        } else {
            setData("tags", [...data.tags, tagId]);
        }
    };

    return (
        <>
            <Head title="Edit Arsip" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href={route("archives.index")}
                        className="text-muted-foreground text-sm hover:text-foreground"
                    >
                        ← Kembali ke Daftar Arsip
                    </Link>

                    <h1 className="mt-2 text-2xl font-semibold">Edit Arsip</h1>

                    <p className="text-muted-foreground mt-1">
                        Perbarui data arsip yang tersimpan di dalam sistem.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div className="space-y-6">
                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">
                                Informasi Arsip
                            </h2>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Nomor Arsip *
                                    </label>

                                    <input
                                        type="text"
                                        value={data.archive_number}
                                        onChange={(e) =>
                                            setData(
                                                "archive_number",
                                                e.target.value,
                                            )
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
                                    />

                                    {errors.archive_number && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.archive_number}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Tanggal Dokumen *
                                    </label>

                                    <input
                                        type="date"
                                        value={data.document_date}
                                        onChange={(e) =>
                                            setData(
                                                "document_date",
                                                e.target.value,
                                            )
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
                                    />

                                    {errors.document_date && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.document_date}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium">
                                        Subjek *
                                    </label>

                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) =>
                                            setData("subject", e.target.value)
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Pengirim
                                    </label>

                                    <input
                                        type="text"
                                        value={data.sender}
                                        onChange={(e) =>
                                            setData("sender", e.target.value)
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Penerima
                                    </label>

                                    <input
                                        type="text"
                                        value={data.recipient}
                                        onChange={(e) =>
                                            setData("recipient", e.target.value)
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">
                                Klasifikasi Arsip
                            </h2>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Kategori
                                    </label>

                                    <select
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value,
                                            )
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
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
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Tipe Arsip
                                    </label>

                                    <select
                                        value={data.archive_type_id}
                                        onChange={(e) =>
                                            setData(
                                                "archive_type_id",
                                                e.target.value,
                                            )
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
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
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Unit
                                    </label>

                                    <select
                                        value={data.unit_id}
                                        onChange={(e) =>
                                            setData("unit_id", e.target.value)
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
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
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Status *
                                    </label>

                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="bg-background w-full rounded-lg border px-4 py-2.5 text-sm"
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
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">Tag</h2>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {tags.map((tag) => {
                                    const checked = data.tags.includes(tag.id);

                                    return (
                                        <label
                                            key={tag.id}
                                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${
                                                checked
                                                    ? "border-primary bg-primary/10"
                                                    : ""
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
                        </div>

                        <div className="rounded-xl border p-6">
                            <h2 className="text-lg font-semibold">Deskripsi</h2>

                            <textarea
                                rows={5}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="bg-background mt-5 w-full resize-none rounded-lg border px-4 py-3 text-sm"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("archives.index")}
                                className="rounded-lg border px-5 py-2.5 text-sm font-medium"
                            >
                                Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-50"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
