// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { DataSourceTemplate, DataSourceContext } from "@graphprotocol/graph-ts";

export class DeedMetadata extends DataSourceTemplate {
  static create(cid: string): void {
    DataSourceTemplate.create("DeedMetadata", [cid]);
  }

  static createWithContext(cid: string, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext("DeedMetadata", [cid], context);
  }
}