const https = require('https');

const SB_URL = 'https://tldbjsqhjqapdwmfeuwq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZGJqc3FoanFhcGR3bWZldXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjIzMzAsImV4cCI6MjA5Mzc5ODMzMH0.NjkXKsqgQf7eo8Z1PQtZxFmQNUA8nH-lF-0eEepugPQ';

function queryTable(tableName) {
  return new Promise((resolve) => {
    const url = `${SB_URL}/rest/v1/${tableName}?select=*`;
    const options = {
      headers: {
        'apikey': SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`\n========================================`);
        console.log(`📊 TABLE: ${tableName.toUpperCase()}`);
        console.log(`========================================`);
        console.log(`Status Code: ${res.statusCode}`);
        
        try {
          const json = JSON.parse(data);
          if (Array.isArray(json)) {
            console.log(`Total Records: ${json.length}`);
            if (json.length === 0) {
              console.log(`(Table is currently empty)`);
            } else {
              json.forEach((row, i) => {
                console.log(`\n[#${i + 1}] ID: ${row.id || 'N/A'}`);
                if (tableName === 'users') {
                  console.log(`   Name:   ${row.name}`);
                  console.log(`   Email:  ${row.email}`);
                  console.log(`   Phone:  ${row.phone}`);
                  console.log(`   Brand:  ${row.brand}`);
                  console.log(`   Plan:   ${row.plan}`);
                } else if (tableName === 'patterns') {
                  console.log(`   Name:   ${row.name}`);
                  console.log(`   Format: ${row.format}`);
                  console.log(`   File:   ${row.file_url ? '✅ Attached' : '❌ No File'}`);
                  console.log(`   Image:  ${row.image_url ? '✅ Preview Set' : '❌ No Image'}`);
                } else if (tableName === 'spec_sheets') {
                  console.log(`   Name:   ${row.name}`);
                  console.log(`   Category: ${row.category}`);
                  console.log(`   File:   ${row.file_url ? '✅ Attached' : '❌ No File'}`);
                } else if (tableName === 'manufacturers') {
                  console.log(`   Name:   ${row.name}`);
                  console.log(`   Location: ${row.location}`);
                  console.log(`   MOQ:    ${row.min_order || 'N/A'}`);
                }
              });
            }
          } else {
            console.log(`Response Body:`, json);
          }
        } catch (e) {
          console.log(`Raw Body:`, data);
        }
        resolve();
      });
    }).on('error', err => {
      console.error(`Error querying ${tableName}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  console.log('⚡ Checking Supabase Live Sync Status...');
  await queryTable('users');
  await queryTable('patterns');
  await queryTable('spec_sheets');
  await queryTable('manufacturers');
  console.log('\n========================================');
  console.log('✅ Live Sync Check Complete!');
}

run();
