<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Permissions
        |--------------------------------------------------------------------------
        */

        $permissions = [
            [
                'name' => 'dashboard.view',
                'display_name' => 'Melihat Dashboard',
                'description' => 'Mengakses halaman dashboard.',
            ],

            [
                'name' => 'users.view',
                'display_name' => 'Melihat Pengguna',
                'description' => 'Melihat daftar pengguna.',
            ],

            [
                'name' => 'users.create',
                'display_name' => 'Menambah Pengguna',
                'description' => 'Menambahkan pengguna baru.',
            ],

            [
                'name' => 'users.edit',
                'display_name' => 'Mengubah Pengguna',
                'description' => 'Mengubah data pengguna.',
            ],

            [
                'name' => 'users.delete',
                'display_name' => 'Menghapus Pengguna',
                'description' => 'Menghapus pengguna.',
            ],

            [
                'name' => 'archives.view',
                'display_name' => 'Melihat Arsip',
                'description' => 'Melihat data arsip.',
            ],

            [
                'name' => 'archives.create',
                'display_name' => 'Menambah Arsip',
                'description' => 'Menambahkan arsip baru.',
            ],

            [
                'name' => 'archives.edit',
                'display_name' => 'Mengubah Arsip',
                'description' => 'Mengubah data arsip.',
            ],

            [
                'name' => 'archives.delete',
                'display_name' => 'Menghapus Arsip',
                'description' => 'Menghapus arsip.',
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name']],
                $permission
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        $admin = Role::updateOrCreate(
            ['name' => 'admin'],
            [
                'display_name' => 'Administrator',
                'description' => 'Memiliki akses penuh terhadap sistem.',
            ]
        );

        $arsiparis = Role::updateOrCreate(
            ['name' => 'arsiparis'],
            [
                'display_name' => 'Arsiparis',
                'description' => 'Mengelola data dan proses kearsipan.',
            ]
        );

        $pimpinan = Role::updateOrCreate(
            ['name' => 'pimpinan'],
            [
                'display_name' => 'Pimpinan',
                'description' => 'Mengakses informasi dan data yang diperlukan untuk pemantauan.',
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | Role → Permission
        |--------------------------------------------------------------------------
        */

        // Admin mendapatkan seluruh permission.
        $admin->permissions()->sync(
            Permission::pluck('id')->toArray()
        );

        // Arsiparis.
        $arsiparis->permissions()->sync(
            Permission::whereIn('name', [
                'dashboard.view',
                'archives.view',
                'archives.create',
                'archives.edit',
                'archives.delete',
            ])->pluck('id')->toArray()
        );

        // Pimpinan.
        $pimpinan->permissions()->sync(
            Permission::whereIn('name', [
                'dashboard.view',
                'archives.view',
            ])->pluck('id')->toArray()
        );
    }
}
