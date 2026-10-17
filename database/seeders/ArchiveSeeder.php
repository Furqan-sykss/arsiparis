<?php

namespace Database\Seeders;

use App\Models\Archive;
use App\Models\ArchiveType;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArchiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
         * User yang akan digunakan sebagai uploader.
         */
        $user = User::where('email', 'test@example.com')->firstOrFail();

        /*
         * =========================
         * CATEGORIES
         * =========================
         */
        $categories = [
            'Surat Masuk',
            'Surat Keluar',
            'Surat Keputusan',
            'Surat Edaran',
            'Laporan',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate(
                ['name' => $name],
                ['status' => true]
            );
        }

        /*
         * =========================
         * ARCHIVE TYPES
         * =========================
         */
        $archiveTypes = [
            'Dokumen',
            'Surat',
            'Laporan',
            'Keputusan',
            'Nota Dinas',
        ];

        foreach ($archiveTypes as $name) {
            ArchiveType::firstOrCreate(
                ['name' => $name],
                ['status' => true]
            );
        }

        /*
         * =========================
         * UNITS
         * =========================
         */
        $units = [
            'Sekretariat',
            'Bagian Kepegawaian',
            'Bagian Keuangan',
            'Bagian Umum',
            'Bidang Teknologi Informasi',
        ];

        foreach ($units as $name) {
            Unit::firstOrCreate(
                ['name' => $name],
                ['status' => true]
            );
        }

        /*
         * =========================
         * TAGS
         * =========================
         */
        $tags = [
            'Penting',
            'Rahasia',
            'Kepegawaian',
            'Keuangan',
            'Administrasi',
        ];

        foreach ($tags as $name) {
            Tag::firstOrCreate(
                ['name' => $name],
                ['status' => true]
            );
        }

        /*
         * Ambil ID data master.
         */
        $categorySuratMasuk = Category::where('name', 'Surat Masuk')->firstOrFail();
        $categorySuratKeluar = Category::where('name', 'Surat Keluar')->firstOrFail();

        $typeSurat = ArchiveType::where('name', 'Surat')->firstOrFail();
        $typeLaporan = ArchiveType::where('name', 'Laporan')->firstOrFail();

        $unitSekretariat = Unit::where('name', 'Sekretariat')->firstOrFail();
        $unitKepegawaian = Unit::where('name', 'Bagian Kepegawaian')->firstOrFail();

        /*
         * =========================
         * ARCHIVES
         * =========================
         */
        Archive::firstOrCreate(
            ['archive_number' => 'ARS-2026-0001'],
            [
                'document_date' => '2026-01-15',
                'subject' => 'Surat Masuk Dinas Tahun 2026',
                'sender' => 'Instansi Pemerintah',
                'recipient' => 'Sekretariat',
                'archive_type_id' => $typeSurat->id,
                'category_id' => $categorySuratMasuk->id,
                'unit_id' => $unitSekretariat->id,
                'status' => 'uploaded',
                'description' => 'Dokumen surat masuk sebagai data contoh sistem arsip.',
                'uploaded_by' => $user->id,
            ]
        );

        Archive::firstOrCreate(
            ['archive_number' => 'ARS-2026-0002'],
            [
                'document_date' => '2026-02-10',
                'subject' => 'Laporan Administrasi Bulanan',
                'sender' => 'Bagian Kepegawaian',
                'recipient' => 'Sekretariat',
                'archive_type_id' => $typeLaporan->id,
                'category_id' => $categorySuratKeluar->id,
                'unit_id' => $unitKepegawaian->id,
                'status' => 'uploaded',
                'description' => 'Laporan administrasi bulanan sebagai data contoh.',
                'uploaded_by' => $user->id,
            ]
        );

        Archive::firstOrCreate(
            ['archive_number' => 'ARS-2026-0003'],
            [
                'document_date' => '2026-03-05',
                'subject' => 'Surat Edaran Administrasi',
                'sender' => 'Sekretariat',
                'recipient' => 'Seluruh Unit',
                'archive_type_id' => $typeSurat->id,
                'category_id' => $categorySuratKeluar->id,
                'unit_id' => $unitSekretariat->id,
                'status' => 'uploaded',
                'description' => 'Surat edaran administrasi sebagai data contoh.',
                'uploaded_by' => $user->id,
            ]
        );

        /*
 * =========================
 * ARCHIVE TAGS
 * =========================
 */

        $archive1 = Archive::where('archive_number', 'ARS-2026-0001')->firstOrFail();
        $archive2 = Archive::where('archive_number', 'ARS-2026-0002')->firstOrFail();
        $archive3 = Archive::where('archive_number', 'ARS-2026-0003')->firstOrFail();

        $tagPenting = Tag::where('name', 'Penting')->firstOrFail();
        $tagAdministrasi = Tag::where('name', 'Administrasi')->firstOrFail();
        $tagKepegawaian = Tag::where('name', 'Kepegawaian')->firstOrFail();
        $tagKeuangan = Tag::where('name', 'Keuangan')->firstOrFail();

        $archive1->tags()->sync([
            $tagPenting->id,
            $tagAdministrasi->id,
        ]);

        $archive2->tags()->sync([
            $tagKepegawaian->id,
            $tagKeuangan->id,
        ]);

        $archive3->tags()->sync([
            $tagAdministrasi->id,
        ]);
    }
}
