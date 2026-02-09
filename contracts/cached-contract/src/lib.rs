//! Counter Contract

#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

use stylus_sdk::{alloy_primitives::U256, prelude::*, storage::StorageU256};
use stylus_cache_sdk::{is_contract_cacheable, AutoCacheOptIn, emit_cache_opt_in};



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

    /// Returns whether this contract is cacheable
    pub fn is_cacheable(&self) -> bool {
        is_contract_cacheable()
    }

    /// Opt-in to caching (call once after deployment)
    pub fn opt_in_to_cache(&mut self) {
        emit_cache_opt_in();
    }
}