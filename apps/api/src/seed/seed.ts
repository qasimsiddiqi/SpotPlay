import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Check if Super Admin already exists (idempotent seeding)
  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: 'superadmin@spotplay.com' },
  });

  if (existingSuperAdmin) {
    console.log('✅ Super Admin already exists. Skipping creation...');
    return;
  }

  // Hash the password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash('test@123', saltRounds);

  // Create Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@spotplay.com',
      userName: 'superadmin',
      password: hashedPassword,
      fullName: 'Super Admin',
      role: Role.SUPERADMIN, // Your existing enum value
      // Add any other required fields from your User model here
      // e.g. phone: '+923001234567',
      // isActive: true,
    },
  });

  console.log('🎉 Super Admin seeded successfully!');
  console.log('   Email    :', superAdmin.email);
  console.log('   Role     :', superAdmin.role);
  console.log(
    '   Password : test@123  (Change this immediately in production!)',
  );
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
