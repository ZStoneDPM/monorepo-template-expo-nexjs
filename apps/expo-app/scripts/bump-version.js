#!/usr/bin/env node

/**
 * Bumps the app version in package.json and app.json (Expo config).
 * Constants.expoConfig.version comes from app.json.
 *
 * Usage (from apps/expo-app):
 *   pnpm bump:version           # patch: 1.0.0 -> 1.0.1
 *   pnpm bump:version -- minor  # minor: 1.0.0 -> 1.1.0
 *   pnpm bump:version -- major  # major: 1.0.0 -> 2.0.0
 *
 * From monorepo root:
 *   pnpm bump:version
 *   pnpm bump:version -- minor
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PACKAGE_JSON = path.join(ROOT, "package.json");
const APP_JSON = path.join(ROOT, "app.json");

function parseVersion(version) {
	const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
	if (!match) {
		throw new Error(`Invalid semver: ${version}`);
	}
	return {
		major: parseInt(match[1], 10),
		minor: parseInt(match[2], 10),
		patch: parseInt(match[3], 10),
		prerelease: match[4] ?? null,
	};
}

function formatVersion(v) {
	let s = `${v.major}.${v.minor}.${v.patch}`;
	if (v.prerelease) s += `-${v.prerelease}`;
	return s;
}

function bump(version, type) {
	const v = parseVersion(version);
	switch (type) {
		case "major":
			v.major += 1;
			v.minor = 0;
			v.patch = 0;
			v.prerelease = null;
			break;
		case "minor":
			v.minor += 1;
			v.patch = 0;
			v.prerelease = null;
			break;
		case "patch":
		default:
			v.patch += 1;
			v.prerelease = null;
			break;
	}
	return formatVersion(v);
}

function main() {
	const type = (process.argv[2] || "patch").toLowerCase();
	if (!["major", "minor", "patch"].includes(type)) {
		console.error("Usage: pnpm bump:version [major|minor|patch]");
		process.exit(1);
	}

	const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf8"));
	const app = JSON.parse(fs.readFileSync(APP_JSON, "utf8"));

	const current = pkg.version;
	const next = bump(current, type);

	pkg.version = next;
	if (app.expo) {
		app.expo.version = next;
	}

	fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + "\n");
	fs.writeFileSync(APP_JSON, JSON.stringify(app, null, 2) + "\n");

	console.log(`Version bumped: ${current} -> ${next} (${type})`);
	console.log("  - package.json");
	console.log("  - app.json (expo.version)");
}

main();
