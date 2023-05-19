package com.inkubiks.eventservice.presentation

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.inkubiks.eventservice.R
import com.inkubiks.eventservice.adapters.ListAvatarUser
import com.inkubiks.eventservice.databinding.FragmentGuestProfileBinding
import com.inkubiks.eventservice.models.profile.Profile
import com.inkubiks.eventservice.models.profile.Status
import com.inkubiks.eventservice.viewmodel.GuestProfileViewModel

class GuestProfileFragment : Fragment() {

    private var binding: FragmentGuestProfileBinding? = null
    private val viewModel: GuestProfileViewModel by viewModels()
    private var teamAdapter: ListAvatarUser? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        teamAdapter = ListAvatarUser(
            object : ListAvatarUser.Listener {
                override fun clickUser(profile: Profile) {
                    findNavController().navigate(
                        R.id.guestProfileFragment,
                        bundleOf(DATA_GUEST_PROFILE_ARG to profile)
                    )
                }
            }
        )
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentGuestProfileBinding.inflate(layoutInflater, container, false)
        return binding?.root
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        initTeamRecyclerView()
        val guestProfile = arguments?.getParcelable(DATA_GUEST_PROFILE_ARG) as? Profile
        guestProfile?.let {
            viewModel.setData(it)
        }
        binding?.apply {
            viewModel.questProfile.observe(viewLifecycleOwner) { profile ->
                if (profile.isGuest) {
                    headProfile.ivBack.visibility = View.VISIBLE
                    headProfile.ivSettings.visibility = View.INVISIBLE
                }
                if (profile.status == Status.ON_HOLIDAY.value) {
                    headProfile.ivHoliday.visibility = View.VISIBLE
                }
                Glide.with(this@GuestProfileFragment)
                    .load(profile.avatar)
                    .override(250, 250)
                    .circleCrop()
                    .into(headProfile.avatar)
                headProfile.tvNameUser.text = profile.name
                headProfile.tvStatus.text = profile.status
                headProfile.tvCity.text = profile.city
                tvDepartment.text = profile.department
                tvPosition.text = profile.position
                tvExperience.text = profile.experience
                headProfile.ivBack.setOnClickListener { findNavController().navigateUp() }
            }
        }
    }

    private fun initTeamRecyclerView () {
        val linearLayoutManager = LinearLayoutManager(context)
        linearLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        binding?.rvTeam?.apply {
            layoutManager = linearLayoutManager
            adapter = teamAdapter
        }
    }


    companion object {
        const val DATA_GUEST_PROFILE_ARG = "data_guest_profile_arg"
    }
}