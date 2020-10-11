import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
import Router from '../../router';
import Destinations from '../../destinations';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Router test', () => {
    const router = new Router();
    assert.strictEqual(router.hasDestinations, true);
    assert.strictEqual(Boolean(router.findDestination('txt')), false);
    assert.strictEqual(Boolean(router.findDestination('rb')), true);
    assert.strictEqual(Boolean(router.findDestination('ts')), true);
    assert.strictEqual(typeof router.findDestination('rb'), 'object');
    assert.strictEqual(typeof router.findDestination('ts'), 'string');
  });

  test('Destinations test', () => {
    const dest = new Destinations();
    assert.strictEqual(dest.isExists, true);
    assert.notStrictEqual(typeof dest.readFile(), 'undefined');
  });
});
