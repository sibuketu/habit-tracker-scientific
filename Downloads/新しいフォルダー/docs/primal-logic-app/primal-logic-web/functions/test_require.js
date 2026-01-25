try {
    require('./lib/index.js');
    console.log('Successfully loaded lib/index.js');
} catch (e) {
    console.error('Failed to load lib/index.js:', e);
    process.exit(1);
}
