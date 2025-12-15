import { test, expect } from '@playwright/test';

test.describe('Vacancy End-to-End Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/jobs');
  });

  test('User membuka halaman list lowongan', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/\/jobs/);
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible({ timeout: 5000 });
    
    const vacancyItems = page.locator('.rounded-xl.border');
    await expect(vacancyItems.first()).toBeVisible({ timeout: 10000 });
    
    await page.screenshot({ path: 'tests/screenshots/vacancy-list.png' });
  });

  test('User mencari pekerjaan berdasarkan judul', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const searchInput = page.locator('input[placeholder*="cari"]');
    await expect(searchInput).toBeVisible({ timeout: 5000 });

    await searchInput.fill('Backend');

    await page.waitForTimeout(1500);

    const searchResults = page.locator('.rounded-xl.border');

    const count = await searchResults.count();
    
    if (count > 0) {
      const firstResult = searchResults.first();
      await expect(firstResult).toContainText(/backend/i);
    } else {
      console.log('Tidak ada hasil pencarian untuk "Backend"');
    }

    await page.screenshot({ path: 'tests/screenshots/search-results.png' });
  });

  test('User melihat detail lowongan', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const firstVacancy = page.locator('.rounded-xl.border').first();
    await expect(firstVacancy).toBeVisible({ timeout: 10000 });

    const vacancyTitle = await firstVacancy.locator('h3').textContent();
    console.log(`Mengklik lowongan: ${vacancyTitle}`);

    const vacancyLink = firstVacancy.locator('a').first();
    const href = await vacancyLink.getAttribute('href');
    console.log(`URL detail: ${href}`);

    await vacancyLink.click();
    
    await page.waitForURL(/\/admin\/vacancies\/detail\/\d+/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });

    if (vacancyTitle) {
      const shortTitle = vacancyTitle.trim().substring(0, 15);
      await expect(page.locator('h1')).toContainText(shortTitle, { timeout: 5000 });
    }

    await page.screenshot({ path: 'tests/screenshots/vacancy-detail.png', fullPage: true });
  });

  test('Full user journey: List → Search → Detail', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main')).toBeVisible();
    console.log('✓ Halaman list berhasil dimuat');

    const searchInput = page.locator('input[placeholder*="cari"]');
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('Developer');
      await page.waitForTimeout(1500);
      console.log('✓ Pencarian "Developer" selesai');
    }

    const firstVacancy = page.locator('.rounded-xl.border').first();
    await expect(firstVacancy).toBeVisible({ timeout: 10000 });

    const vacancyLink = firstVacancy.locator('a').first();
    await vacancyLink.click();
    
    await page.waitForURL(/\/admin\/vacancies\/detail\/\d+/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    
    console.log('✓ Navigasi ke detail berhasil');

    await expect(page.locator('h1')).toBeVisible();
    console.log('✓ Detail lowongan berhasil ditampilkan');

    await page.screenshot({ path: 'tests/screenshots/full-journey.png', fullPage: true });
  });

});