#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server';

try {
  await createServer().connect(new StdioServerTransport());
} catch (error) {
  console.error('Vibe Dictionary MCP 시작 실패:', error);
  process.exitCode = 1;
}
