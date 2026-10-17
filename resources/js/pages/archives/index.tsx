import { Head, Link, router, usePage } from "@inertiajs/react";
import { route } from "@/lib/route";
import { useState } from "react";

const formatDate = (date: string) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(parsedDate);
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { can } from "@/lib/permissions";
import type { User } from "@/types/auth";

type Archive = {
    id: number;
    archive_number: string;
    document_date: string;
    subject: string;
    sender: string | null;
    recipient: string | null;
    status: string;
    description: string | null;

    category?: {
        id: number;
        name: string;
    } | null;

    archiveType?: {
        id: number;
        name: string;
    } | null;

    unit?: {
        id: number;
        name: string;
    } | null;

    tags?: {
        id: number;
        name: string;
    }[];
};

type PaginatedArchives = {
    data: Archive[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    archives: PaginatedArchives;

    filters: {
        search?: string;
        category_id?: string;
        archive_type_id?: string;
        unit_id?: string;
        status?: string;
    };

    categories: {
        id: number;
        name: string;
    }[];

    archiveTypes: {
        id: number;
        name: string;
    }[];

    units: {
        id: number;
        name: string;
    }[];

    tags: {
        id: number;
        name: string;
    }[];
};

type PageProps = {
    auth: {
        user: User;
    };
};

export default function ArchivesIndex({
    archives,
    filters,
    categories,
    archiveTypes,
    units,
}: Props) {
    const { auth } = usePage<PageProps>().props;

    const permissions = auth.user.permissions;

    const [search, setSearch] = useState(filters.search ?? "");
    const [categoryId, setCategoryId] = useState(filters.category_id ?? "");

    const [archiveTypeId, setArchiveTypeId] = useState(
        filters.archive_type_id ?? "",
    );

    const [unitId, setUnitId] = useState(filters.unit_id ?? "");

    const [status, setStatus] = useState(filters.status ?? "");

    const handleSearch = () => {
        router.get(
            route("archives.index"),
            {
                search: search || undefined,
                category_id: categoryId || undefined,
                archive_type_id: archiveTypeId || undefined,
                unit_id: unitId || undefined,
                status: status || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleFilterChange = (
        filter: "category_id" | "archive_type_id" | "unit_id" | "status",
        value: string,
    ) => {
        const params = {
            search: search || undefined,
            category_id:
                filter === "category_id"
                    ? value || undefined
                    : categoryId || undefined,
            archive_type_id:
                filter === "archive_type_id"
                    ? value || undefined
                    : archiveTypeId || undefined,
            unit_id:
                filter === "unit_id" ? value || undefined : unitId || undefined,
            status:
                filter === "status" ? value || undefined : status || undefined,
        };

        router.get(route("archives.index"), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setSearch("");
        setCategoryId("");
        setArchiveTypeId("");
        setUnitId("");
        setStatus("");

        router.get(
            route("archives.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title="Arsip" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Daftar Arsip
                        </h1>

                        <p className="text-muted-foreground">
                            Kelola dan lihat data arsip yang tersimpan.
                        </p>
                    </div>

                    {can(permissions, "archives.create") && (
                        <Button asChild>
                            <Link href={route("archives.create")}>
                                Tambah Arsip
                            </Link>
                        </Button>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Arsip</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <Input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleSearch();
                                    }
                                }}
                                placeholder="Cari nomor arsip, subjek, pengirim, atau penerima..."
                            />

                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                                <select
                                    value={categoryId}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setCategoryId(value);
                                        handleFilterChange(
                                            "category_id",
                                            value,
                                        );
                                    }}
                                    className="border-input bg-background ring-offset-background focus:ring-ring h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                >
                                    <option value="">Semua Kategori</option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={archiveTypeId}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setArchiveTypeId(value);
                                        handleFilterChange(
                                            "archive_type_id",
                                            value,
                                        );
                                    }}
                                    className="border-input bg-background ring-offset-background focus:ring-ring h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                >
                                    <option value="">Semua Tipe</option>

                                    {archiveTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={unitId}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setUnitId(value);
                                        handleFilterChange("unit_id", value);
                                    }}
                                    className="border-input bg-background ring-offset-background focus:ring-ring h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                >
                                    <option value="">Semua Unit</option>

                                    {units.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={status}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setStatus(value);
                                        handleFilterChange("status", value);
                                    }}
                                    className="border-input bg-background ring-offset-background focus:ring-ring h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="uploaded">Uploaded</option>
                                    <option value="processing">
                                        Processing
                                    </option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={handleSearch}>Cari</Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleReset}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-md border">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-muted/50 border-b">
                                        <th className="px-4 py-3 text-left font-medium">
                                            No. Arsip
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Tanggal
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Subjek
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Kategori
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium">
                                            Tipe
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Unit
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Status
                                        </th>

                                        <th className="px-4 py-3 text-right font-medium">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {archives.data.length > 0 ? (
                                        archives.data.map((archive) => (
                                            <tr
                                                key={archive.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-3 font-medium whitespace-nowrap">
                                                    {archive.archive_number}
                                                </td>

                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {formatDate(
                                                        archive.document_date,
                                                    )}
                                                </td>

                                                <td className="max-w-[280px] px-4 py-3">
                                                    <span
                                                        className="block truncate"
                                                        title={archive.subject}
                                                    >
                                                        {archive.subject}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3">
                                                    {archive.category?.name ??
                                                        "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {archive.archiveType
                                                        ?.name ?? "-"}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {archive.unit?.name ?? "-"}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant="secondary"
                                                        className="capitalize"
                                                    >
                                                        {archive.status}
                                                    </Badge>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        {can(
                                                            permissions,
                                                            "archives.view",
                                                        ) && (
                                                            <Button
                                                                asChild
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        "archives.show",
                                                                        archive.id,
                                                                    )}
                                                                >
                                                                    Lihat
                                                                </Link>
                                                            </Button>
                                                        )}

                                                        {can(
                                                            permissions,
                                                            "archives.edit",
                                                        ) && (
                                                            <Button
                                                                asChild
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        "archives.edit",
                                                                        archive.id,
                                                                    )}
                                                                >
                                                                    Edit
                                                                </Link>
                                                            </Button>
                                                        )}

                                                        {can(
                                                            permissions,
                                                            "archives.delete",
                                                        ) && (
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            `Hapus arsip ${archive.archive_number}?`,
                                                                        )
                                                                    ) {
                                                                        router.delete(
                                                                            route(
                                                                                "archives.destroy",
                                                                                archive.id,
                                                                            ),
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                Hapus
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="text-muted-foreground px-4 py-8 text-center"
                                            >
                                                Belum ada data arsip.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-muted-foreground text-sm">
                                Menampilkan {archives.from ?? 0}–
                                {archives.to ?? 0} dari {archives.total} arsip
                            </p>

                            <div className="flex gap-2">
                                {archives.current_page > 1 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(
                                                route("archives.index"),
                                                {
                                                    ...filters,
                                                    page:
                                                        archives.current_page -
                                                        1,
                                                },
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            )
                                        }
                                    >
                                        Sebelumnya
                                    </Button>
                                )}

                                {archives.current_page < archives.last_page && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(
                                                route("archives.index"),
                                                {
                                                    ...filters,
                                                    page:
                                                        archives.current_page +
                                                        1,
                                                },
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            )
                                        }
                                    >
                                        Berikutnya
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
