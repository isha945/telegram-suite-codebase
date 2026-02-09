//! Counter Contract

#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

use stylus_sdk::{alloy_primitives::U256, prelude::*, storage::StorageU256};

sol_storage! {
    #[entrypoint]
    pub struct Counter {
        StorageU256 count;
    }
}

#[public]
impl Counter {
    pub fn get_count(&self) -> U256 {
        self.count.get()
    }

    pub fn set_count(&mut self, value: U256) {
        self.count.set(value);
    }
}