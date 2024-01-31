#!/usr/bin/env node

/**
 * Remove all traces of WebTorrent Desktop from the system (config and temp files).
 * Useful for developers.
 */

const fs = require('fs')
const os = require('os')
const path = require('path')
const rimraf = require('rimraf')

const config = require('../src/config')
const handlers = require('../src/main/handlers')

// First, remove generated files
rimraf.sync('build/')
rimraf.sync('dist/')
rimraf.sync('node_modules')

// Remove any saved configuration
rimraf.sync(config.CONFIG_PATH)

// Remove any temporary files
let tmpPath
try {
  tmpPath = path.join(fs.statSync('/tmp') && '/tmp', 'webtorrent')
} catch (err) {
  tmpPath = path.join(os.tmpdir(), 'webtorrent')
}
rimraf.sync(tmpPath)

// Uninstall .torrent file and magnet link handlers
handlers.uninstall()
